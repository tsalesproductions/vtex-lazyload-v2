class vtexLazyLoad{
  constructor(params){
    this.setParams(params||{
      selector: ".si-lazyload",
      element: "noscript",
      file: {
        selector: "img",
        attribute: "data-src",
        className: "lazy"
      },
      callback: this.setLazyLoad
    })
    
    this.init();
  }
  setParams(params){
    Object.keys(params).forEach((param) => {
      this[param] = params[param]
    })
  }
  getSelectors(){
    return document.querySelectorAll(this.selector);
  }
  getElement(selector){
    selector = selector.querySelector(this.element);
    if(!selector){
      return false;
    }
    return new DOMParser().parseFromString(selector.textContent, "text/html")
  }
  setAtributtesOnFiles(element){
    for(const selector of element.querySelectorAll(this.file.selector)){
      const src = selector.getAttribute('src');
        selector.setAttribute(this.file.attribute, src);
        selector.classList.add(this.file.className)
        selector.removeAttribute('src');
    }
    return element;

  }
  setLazyLoad(selector){
    if(typeof LazyLoad !== 'undefined'){
      this.lazyload = new LazyLoad();
    }
    return selector;
  }
  init(){
    const selectors = this.getSelectors();

    for(const selector of selectors){
      const element = this.setAtributtesOnFiles(this.getElement(selector));
       
      selector.innerHTML = element.querySelector("body").innerHTML;
    }

    return this.callback(selectors)
  }
}

const lazy = new vtexLazyLoad();
