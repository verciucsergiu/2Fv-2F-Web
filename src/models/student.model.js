var Student = class extends UserModel {
    constructor(username, nume, prezente, obs, sanse, notaP, notaA, notaS, notaE, tipProiect) {
        super(username, nume, prezente, obs, sanse);
        this.notaA = notaA;
        this.notaP = notaP;
        this.notaS = notaS;
        this.notaE = notaE;
        this.tipProiect = tipProiect;
    }
}