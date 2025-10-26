const md = window.markdownit();
md.use(window.texmath.use(window.katex), {
  engine: window.katex,
  delimiters: 'dollars',
  katexOptions: { macros: { "\\RR": "\\mathbb{R}" } }
});

async function render() {
    const supabase = getClient();
    const problemNameEl = document.getElementById('wiki_name');
    const optionsEl = document.getElementById('options');
    const containerEl = document.getElementById('wiki_name');
    const id = getArgs('id');
    if (id) {
        const { data: problem, error } = await supabase
            .from('wiki')
            .select('*')
            .eq('id', id)
            .single();
        if (error) {
            problemNameEl.innerHTML = ``;
            containerEl.innerHTML = `<p>No such wiki</p>`;
            return;
        }
        problemNameEl.textContent = problem.name;
        optionsEl.innerHTML = `
            <a href="problem">Problem List</a>
        `;
        try {
            const info = JSON.parse(problem.info);
            containerEl.innerHTML = md.render(info.description) || '<p>No description</p>';
        } catch (e) {
            containerEl.innerHTML = '<p>No description</p>';
        }
    } else {
        const { data: problems, error } = await supabase
            .from('problems')
            .select('id, name')
            .order('id');

        if (error) {
            containerEl.innerHTML = `<p>Load problem list failed</p>`;
            return;
        }
        problemNameEl.textContent = "Problem List";
        optionsEl.innerHTML = '';
        let tableHTML = `
            <table border="1" style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr>
                        <th>Wiki ID</th>
                        <th>Wiki Name</th>
                    </tr>
                </thead>
                <tbody>
        `;
        problems.forEach(problem => {
            tableHTML += `
                <tr>
                    <td><a href="problem?id=${problem.id}">${problem.id}</a></td>
                    <td><a href="problem?id=${problem.id}">${problem.name}</a></td>
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
render();
