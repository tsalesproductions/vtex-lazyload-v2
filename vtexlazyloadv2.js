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
    
  }
  getElements(selector){
    const elements = selector.querySelectorAll(this.element);

    if(elements.length <=0){
      return false;
    }

    this.tempElements = [];
    for(let element of elements){
      try{
        this.tempElements.push({
          dom: new DOMParser().parseFromString(element.textContent, "text/html"),
          element: element,
          parent: element.parentElement
        }) 
      }catch(err){
        return false;
      }
       
    }

    return this.tempElements;

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
  applyChangesOnElements(elements){
    for(const {dom, element, parent} of elements){
      const changes = this.setAtributtesOnFiles(dom);
      element.insertAdjacentHTML('afterend', changes.querySelector("body").innerHTML)
      element.remove();

    }

    return elements;
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
      console.log(selector)
      this.applyChangesOnElements(this.getElements(selector));
    }
    return this.callback(selectors)
  }
}

new vtexLazyLoad();
