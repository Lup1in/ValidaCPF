// 705.484.450-52 // 070.987.720-03

class ValidaCPF {
    constructor(CPFenviado) {
        Object.defineProperty(this, 'cpfLimpo', {
            writable: false,
            configurable: false,
            enumerable: true,
            value: CPFenviado.replace(/\D+/g, ''),
        });
    }
    eSequencia() {
        return this.cpfLimpo.charAt(0).repeat(this.cpfLimpo.length) === this.cpfLimpo;
    };

    geraNovoCPF() {
        const cpfParcial = this.cpfLimpo.slice(0, -2);
        const digitoUm = this.geraDigito(cpfParcial);
        const digito2 = this.geraDigito(cpfParcial + digitoUm);
        this.novoCPF = cpfParcial + digitoUm + digito2;
    }

    geraDigito(cpfParcial) {
        let total = 0;
        let reverso = cpfParcial.length + 1;

        for (let StringNumerica of cpfParcial) {
            total += reverso * Number(StringNumerica);
            reverso--;
        }
        const digito = 11 - (total % 11);
        return digito <= 9 ? String(digito) : '0';
    }

    valida() {
        if (!this.cpfLimpo) return false;
        if (typeof this.cpfLimpo !== 'string') return false;
        if (this.cpfLimpo.length !== 11) return false;
        if (this.eSequencia()) return false;
        if (!this.geraNovoCPF());

        return this.novoCPF === this.cpfLimpo;
    };
}

const validacpf = new ValidaCPF('070.987.720-03');
if (validacpf.valida()) {
    console.log('CPF Válido');
}
else {
    console.log('CPF Inválido');
};

