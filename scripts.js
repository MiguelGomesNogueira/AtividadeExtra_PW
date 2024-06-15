document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-tarefa');
    const inputTarefa = document.getElementById('nova-tarefa');
    const listaTarefas = document.getElementById('lista-tarefas');

    let tarefas = [];

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const textoTarefa = inputTarefa.value.trim();
        if (textoTarefa !== '') {
            adicionarTarefa(textoTarefa);
            inputTarefa.value = '';
        }
    });

    function adicionarTarefa(texto) {
        const novaTarefa = {
            id: Date.now().toString(),
            texto: texto
        };
        tarefas.push(novaTarefa);
        salvarTarefas();
        mostrarTarefas();
    }

    function mostrarTarefas() {
        listaTarefas.innerHTML = '';
        tarefas.forEach(function(tarefa) {
            const li = document.createElement('li');
            li.innerHTML = `
                <input type="text" class="editar-tarefa" value="${tarefa.texto}" disabled>
                <button class="editar">Editar</button>
                <button class="excluir">Excluir</button>
            `;
            li.dataset.id = tarefa.id;
            listaTarefas.appendChild(li);

            const inputEditar = li.querySelector('.editar-tarefa');
            const btnEditar = li.querySelector('.editar');
            const btnExcluir = li.querySelector('.excluir');

            btnEditar.addEventListener('click', function() {
                if (inputEditar.disabled) {
                    inputEditar.disabled = false;
                    inputEditar.focus();
                    btnEditar.textContent = 'Salvar';
                } else {
                    inputEditar.disabled = true;
                    btnEditar.textContent = 'Editar';
                    const novoTexto = inputEditar.value.trim();
                    editarTarefa(tarefa.id, novoTexto);
                }
            });

            btnExcluir.addEventListener('click', function() {
                excluirTarefa(tarefa.id);
            });
        });
    }

    function editarTarefa(id, novoTexto) {
        tarefas = tarefas.map(function(tarefa) {
            if (tarefa.id === id) {
                return {
                    id: tarefa.id,
                    texto: novoTexto
                };
            }
            return tarefa;
        });
        salvarTarefas();
        mostrarTarefas();
    }

    function excluirTarefa(id) {
        tarefas = tarefas.filter(function(tarefa) {
            return tarefa.id !== id;
        });
        salvarTarefas();
        mostrarTarefas();
    }

    function salvarTarefas() {
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }

    function carregarTarefas() {
        const tarefasSalvas = localStorage.getItem('tarefas');
        if (tarefasSalvas) {
            tarefas = JSON.parse(tarefasSalvas);
            mostrarTarefas();
        }
    }

    carregarTarefas();
});
