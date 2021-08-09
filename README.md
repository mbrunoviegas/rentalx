# Cadastro de Carros

**RF**
Deve ser possível cadastrar um novo carro.
Deve ser possível listar todas as categorias.

**RN**
Não deve ser possível cadastrar um carro com uma placa já existente.
O carro deve ser cadastrado, por padrão, com disponibilidade.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Atualização de Carros

**RF**
Deve ser possível alterar as informações de um carro

**RN**
Não deve ser possível alterar a placa de um carro já cadastrado.

# Listagem de Carros

**RF**
Deve ser possível listar todos carros disponíveis.
Deve ser possível listar todos carros disponíveis pelo nome da categoria.
Deve ser possível listar todos carros disponíveis pelo nome da marca.
Deve ser possível listar todos carros disponíveis pelo nome do carro.

**RN**
O usuário não precisa estar logado no sistema.

# Cadastro de Especificação do Carro

**RF**
Deve ser possível cadastrar uma especificação para um carro
Deve ser possível listar todas as especificações
Deve ser possível listar todos os carros

**RN**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Cadastro de Imagens do Caroo

**RF**
Deve ser possível cadastrar a imagem do carro. 
Deve ser possível listar todos os carros.

**RNF**
Utilizar o multer para upload dos arquivos.

**RN**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.


# Aluguel de Carro

**RF**
Deve ser possível cadastrar um aluguel.

**RN**
O aluguel deve ter duração mínima de 24 horas.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
Ao realizar um aluguel, o status deverá ser alterado para indisponível.


# Devolução de Carros

**RF**
Deve ser possível realizar a devolução de um carro

**RN**
Se o carro for devolvido com menos de 24 horas, deverá se cobrado a diária completa.
Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
Ao realizar a devolução, deverá ser calculado o total do aluguel.
Caso o horoário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa aos dias de atraso/
Caso haja multa, deverá ser somado ao total do aluguel.
O usuário deve estar logado na aplicação.


# Listagem de Alugueis para o usuário

**RF**
Deve ser possível realizar a busca de todos os algueis para o usuário

**RN**
O usuário deve estar logado na aplicação