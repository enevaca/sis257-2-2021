// POO
class FiguraGeometrica {
    constructor(atributo) {
        this.atributo = atributo;
    }

    perimetro() { return 0;  }
}

class Rectangulo extends FiguraGeometrica {
    constructor(atributo, alto, ancho) {
        super(atributo);
        this.alto = alto;
        this.ancho = ancho;
    }

    area() {
        return this.alto * this.ancho;
    }

    static prueba() { console.log("Método estático"); }
}
