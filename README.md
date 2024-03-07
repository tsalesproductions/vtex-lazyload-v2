# vtex lazy load

## O que faz:

O projeto **vtex lazy load** foi criado para tornar possível trabalhar com lazy load em qualquer elemento dentro do ambiente VTEX legado.

## Infos adicionais:

Atualmente, foi desenvolvido para funcionar em conjunto com o [vanilla-lazyload](https://github.com/verlok/vanilla-lazyload), porém pode ser utilizado com outros lazy loads utilizando a chamada de callback.

## Como usar:

É recomendado utilizar o noscript no elemento em que será usado, exemplo:

```html
<section class="home__main-banner si-lazyload">
	<noscript>
		<vtex:contentPlaceHolder id="full banners" />
	</noscript>
</section>
```

```html
<div class="shelf-image-container si-lazyload">
  <noscript>$product.GetImageTag(29)</noscript>
</div>
```

### Parâmetros disponíveis:

<table><thead><tr><th>Parâmetro</th><th>Descrição</th><th>Padrão</th></tr></thead><tbody><tr><td>selector</td><td>O seletor CSS que especifica o elemento pai onde o lazy load será aplicado.</td><td>".si-lazyload"</td></tr><tr><td>element</td><td>O elemento HTML filho dentro do elemento pai especificado onde será buscado para decodificar.</td><td>"noscript"</td></tr><tr><td>file</td><td>Um objeto que contém informações sobre os alvos (imagens ou elementos) que serão aplicados o lazy load.</td><td></td></tr><tr><td>file.selector</td><td>O seletor CSS que especifica os alvos (imagens ou elementos) dentro do elemento filho onde o lazy load será aplicado.</td><td>"img"</td></tr><tr><td>file.attribute</td><td>O atributo que será substituído nos alvos pelos seus respectivos atributos de lazy load.</td><td>"data-src"</td></tr><tr><td>file.className</td><td>A classe CSS que será adicionada aos alvos para identificá-los como elementos de lazy load.</td><td>"lazy"</td></tr><tr><td>callback</td><td>Uma função de callback que será chamada para iniciar o lazy load após a configuração dos parâmetros nos elementos.</td><td>this.setLazyLoad</td></tr></tbody></table>

#### Objeto

```javascript
{
  selector: ".si-lazyload", // onde o seletor se refere ao elemento pai
  element: "noscript", // o elemento filho que ele vai buscar para decodificar
  file: { 
    selector: "img", // alvos (imagens) que ele aplicará o lazy load
    attribute: "data-src", // atributo que será substituído
    className: "lazy" // classe de identificação do lazy load
  },
  callback: this.setLazyLoad // função de callback para iniciar o lazy load
}
```

### Exemplos de uso:

#### Chamada básica
```javascript
new vtexLazyLoad();
```
#### Chamada com parâmetros
```javascript
new vtexLazyLoad({
      selector: ".si-lazyload",
      element: "noscript",
      file: {
        selector: "img",
        attribute: "data-src",
        className: "lazy"
      },
      callback: () => {
		//INICIAR SEU LAZYLOAD
	}
})
```

#### Chamada somente com callback
```javascript
new vtexLazyLoad({
      callback: () => {
		//INICIAR SEU LAZYLOAD
	}
})
```
`OBS:` Caso instancie o `callback()`, o próprio da função será anulado. Só é recomendado caso queira implementar suas configurações de lazyload, ou utilizar outra opção de lazyload.

#### Chamada obtendo informações: 
```javascript
const lazy = new vtexLazyLoad();
console.log(lazy)
```

#### chamada com a função `update()` do `vanilla-lazyload`: 
```javascript
const lazy = new vtexLazyLoad();
lazy.lazyload.update();
```

CDN obrigatória caso queira usar com o vanilla-lazyload:
```
<script src="https://cdn.jsdelivr.net/npm/vanilla-lazyload@17.8.8/dist/lazyload.min.js"></script>
```

<hr>
MIT License
