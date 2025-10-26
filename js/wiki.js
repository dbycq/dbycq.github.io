console.log("window.markdownit:", window.markdownit);
console.log("window.katex:", window.katex);
console.log("window.texmath:", window.texmath);
// 1. 修复依赖检查逻辑，直接判断并处理
if (!window.markdownit  || !window.texmath) {
  console.error("依赖库未加载：缺少 markdown-it、katex 或 markdown-it-texmath");
  // 依赖缺失时，在页面显示提示
  const containerEl = document.getElementById('wiki_container');
  if (containerEl) {
    containerEl.innerHTML = `<p style="color: #dc3545;">页面加载失败：缺少必要组件，请刷新重试</p>`;
  }
} else {
  // 2. 修复 texmath 调用方式，移除多余的 .use(window.katex)
  const md = window.markdownit();
  md.use(window.texmath, {
    delimiters: 'dollars',
    katexOptions: { macros: { "\\RR": "\\mathbb{R}" } }
  });

  async function render() {
    // 3. 修复 DOM 元素获取：containerEl 对应 wiki_container
    const supabase = getClient();
    const problemNameEl = document.getElementById('wiki_name');
    const optionsEl = document.getElementById('options');
    const containerEl = document.getElementById('wiki_container'); // 修正ID
    const id = getArgs('id');

    if (id) {
      // 4. 统一表名（假设都用 wiki 表，根据实际数据库调整）
      const { data: problem, error } = await supabase
        .from('wiki')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        problemNameEl.textContent = "加载失败"; // 修正为 textContent，避免空HTML
        containerEl.innerHTML = `<p style="color: #dc3545;">未找到该Wiki内容（ID: ${id}）</p>`;
        return;
      }

      problemNameEl.textContent = problem.name;
      // 5. 修复链接：跳转到 wiki.html（而非 problem），保持页面一致性
      optionsEl.innerHTML = `<a href="wiki.html">Wiki List</a>`;

      try {
        const info = JSON.parse(problem.info);
        containerEl.innerHTML = md.render(info.description) || '<p>No description</p>';
      } catch (e) {
        containerEl.innerHTML = '<p>内容解析失败：暂无描述</p>';
      }
    } else {
      // 6. 统一表名：查询 wiki 表的列表（与有id时一致）
      const { data: problems, error } = await supabase
        .from('wiki')
        .select('id, name')
        .order('id');

      if (error) {
        containerEl.innerHTML = `<p style="color: #dc3545;">加载Wiki列表失败，请重试</p>`;
        return;
      }

      problemNameEl.textContent = "Wiki List";
      optionsEl.innerHTML = '';

      // 7. 修复表格链接：跳转到 wiki.html，显示正确的列表项
      let tableHTML = `
        <table border="1" style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <thead>
            <tr style="background: #f5f5f5;">
              <th style="padding: 8px; text-align: left;">Wiki ID</th>
              <th style="padding: 8px; text-align: left;">Wiki Name</th>
            </tr>
          </thead>
          <tbody>
      `;

      problems.forEach(problem => {
        tableHTML += `
          <tr>
            <td style="padding: 8px;"><a href="wiki.html?id=${problem.id}">${problem.id}</a></td>
            <td style="padding: 8px;"><a href="wiki.html?id=${problem.id}">${problem.name}</a></td>
          </tr>
        `;
      });

      tableHTML += `
          </tbody>
        </table>
      `;
      containerEl.innerHTML = tableHTML;
    }
  }

  // 确保DOM加载完成后再执行渲染
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
}
