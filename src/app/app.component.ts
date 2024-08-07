import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  caloriasFormulario!: FormGroup;
  calorias!: number;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.calorias = 0;
    this.cargarFormulario(new FormBuilder);
  }

  private cargarFormulario(formulario: FormBuilder) {
    this.caloriasFormulario = formulario.group({
      sistema: ['imperial', Validators.required],
      edad: [null, [Validators.required]],
      peso: [null, [Validators.required]],
      altura: [null, [Validators.required]]
    });

    this.caloriasFormulario.valueChanges.subscribe(valores => {
      if (this.caloriasFormulario.valid) {
        let edad = valores.edad;
        let sistema = valores.sistema
        let peso = valores.peso;
        let altura = valores.altura;

        if (sistema === 'decimal') {
          peso = peso / 0.453592;
          altura = altura / 2.54;
        }

        this.calcularCalorias(edad, peso, altura);
      } else {
        this.calorias = 0;
      }
    });
  }

  private calcularFactor(peso: number): number {
    let factor!: number;

    if (peso < 165) {
      factor = 1.6;
    } else if (peso >= 165 && peso <= 200) {
      factor = 1.4;
    } else if (peso > 200 && peso <= 220) {
      factor = 1.2;
    } else if (peso > 220) {
      factor = 1.0;
    }
    return factor;
  }

  private calcularCalorias(edad: number, peso: number, altura: number): void {
    let factorCalculo = this.calcularFactor(peso);
    this.calorias = ((10 * peso) + (6.25 * altura) - (10 * edad) + 5) * factorCalculo;
  }
}