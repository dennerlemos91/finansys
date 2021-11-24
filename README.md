# Finansys

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

 for (DadoVariavelDTO dadoVariavel : variaveisSemInvetimentos) {
            final String valorCampo = String.valueOf(dadoVariavel.getConteudoCampo());
            Optional.ofNullable(VariavelT3
                    .toEnum(dadoVariavel.getNomeCampo().toUpperCase()))
                    .ifPresent(variavel -> variavel.atribuirValor(valorCampo, contratacaoBuilder));
        }
        
@Getter
@AllArgsConstructor
public enum VariavelT3 {
    CNPJ("CNPJ DO CLIENTE") {
        @Override
        public void atribuirValor(String valor,  ComprovanteContratacaoDTO.ComprovanteContratacaoDTOBuilder contratacaoBuilder) {
            contratacaoBuilder.cnpjCliente(valor);
        }
    };
    
    private String descricao;
    
    public static VariavelT3 toEnum(String campo) {
        if (campo == null) {
            return null;
        }
        for (VariavelT3 x : VariavelT3.values()) {
            if (campo.equals(x.name())) {
                return x;
            }
        }
        return null;
    }
        
    public abstract void atribuirValor(String valor,  ComprovanteContratacaoDTO.ComprovanteContratacaoDTOBuilder contratacaoBuilder);    
}
