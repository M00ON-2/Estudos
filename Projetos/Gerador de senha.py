import random
import string

class Senha:
    def __init__(self, tamanho=12):
        self.tamanho = tamanho
        self.valor = self.gerar_senha()

    def gerar_senha(self):
        caracteres = string.ascii_letters + string.digits + string.punctuation
        return ''.join(random.choice(caracteres) for _ in range(self.tamanho))

    def validar_senha(self):
        """Verifica se a senha atende aos critérios de segurança"""
        tem_maiuscula = any(c.isupper() for c in self.valor)
        tem_minuscula = any(c.islower() for c in self.valor)
        tem_numero = any(c.isdigit() for c in self.valor)
        tem_especial = any(c in string.punctuation for c in self.valor)
        return all([tem_maiuscula, tem_minuscula, tem_numero, tem_especial])

# Criando uma senha aleatória
senha1 = Senha()
print("Senha gerada:", senha1.valor)
print("É uma senha segura?", senha1.validar_senha())
