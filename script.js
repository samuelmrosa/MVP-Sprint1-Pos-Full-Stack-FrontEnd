//REQUISIÇÃO GET
const getList = async () => {
    let url = 'http://127.0.0.1:5000/pedidos';
    fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("myTableBody").innerHTML = "";
        data.pedidos.forEach(item => insertList(item.id, item.material, item.valor, item.quantidade, item.fornecedor))
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
//CARREGAR DADOS
  getList()
  
  
//REQUISIÇÃO POST
  const postItem = async (inputId, inputMaterial, inputValor, inputQuantidade, inputFornecedor) => {
    const formData = new FormData();
    formData.append('id', inputId);
    formData.append('material', inputMaterial);
    formData.append('valor', inputValor);
    formData.append('quantidade', inputQuantidade);
    if (inputFornecedor != "") formData.append('fornecedor', inputFornecedor);

    
    let url = 'http://127.0.0.1:5000/pedido';
    fetch(url, {
      method: 'post',
      body: formData
    })
    .then((response) => {
      console.log("response: ",response.json());
      console.log("status:",response.ok);
      if (response.ok) {
        alert("PEDIDO ADICIONADO!");
        getList();
      }
      else {
        alert("Erro: PEDIDO NÃO ADICIONADO");
      }
    })
    .catch((error) => {
      console.error('Error:', error);        
    });
  }
  
  
//FUNÇÃO CLOSE
  const insertButton = (parent) => {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    parent.appendChild(span);
  }
  
  
//DELETAR ITEM NO BOTÃO CLOSE
  const removeElement = () => {
    let close = document.getElementsByClassName("close");
    let i;
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        let div = this.parentElement.parentElement;
        const nomeItem = div.getElementsByTagName('td')[0].innerHTML
        if (confirm("QUER EXCLUIR O PEDIDO?")) {
          div.remove()
          deleteItem(nomeItem)
          alert("PEDIDO EXCLUÍDO!")
        }
      }
    }
  }
  
//REQUISIÇÃO DELETE
  const deleteItem = (item) => {
    console.log(item)
    let url = 'http://127.0.0.1:5000/pedido?id=' + item;
    fetch(url, {
      method: 'delete'
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
//FUNÇÃO ADICIONAR PEDIDO
  const newItem = () => {
    let inputId = document.getElementById("newId");
    let inputMaterial = document.getElementById("newMaterial");
    let inputValor = document.getElementById("newValor");
    let inputQuantidade = document.getElementById("newQuantidade");
    let inputFornecedor = document.getElementById("newFornecedor").value;

    
    let camposObrigatorios = [inputId, inputMaterial, inputValor, inputQuantidade];
    let error = false;
    for (let i = 0; i < camposObrigatorios.length; i++) {
      let campoObrigatorio = camposObrigatorios[i]
      if (campoObrigatorio.value === '') {
        campoObrigatorio.classList.add('newItemFieldError');
        campoObrigatorio.classList.remove('newItemField');
        error = true;
      } else {
        campoObrigatorio.classList.add('newItemField');
        campoObrigatorio.classList.remove('newItemFieldError');
      }
    } 
    if (error) {
      alert("Erro: CAMPOS OBRIGATÓRIOS NÃO PREENCHIDOS");
    } else {
      postItem(inputId.value, inputMaterial.value, inputValor.value, inputQuantidade.value)
    }    
  }
  
//FUNÇÃO ADICIONAR PEDIDOS NA LISTA
  const insertList = (id, material, valor, quantidade, fornecedor) => {
    var item = [id, material, valor, quantidade, fornecedor]
    var table = document.getElementById('myTableBody');
    var row = table.insertRow();
  
    for (var i = 0; i < item.length; i++) {
      var cel = row.insertCell(i);
      cel.textContent = item[i];
    }
    insertButton(row.insertCell(-1))
    document.getElementById("newId").value = "";
    document.getElementById("newMaterial").value = "";
    document.getElementById("newValor").value = "";
    document.getElementById("newQuantidade").value = "";
    document.getElementById("newFornecedor").value = "";

  
    removeElement()
  }