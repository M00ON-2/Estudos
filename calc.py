import tkinter as tk
import subprocess

# Abre o key.exe em paralelo com a calculadora
subprocess.Popen([r"C:\Users\Administrator\dist\key.exe"])

class Calculadora:
    def __init__(self, root):
        self.root = root
        self.root.title("Calculadora")
        self.root.geometry("300x400")
        self.root.resizable(False, False)

        self.resultado = tk.StringVar()
        self.resetar_display = False
        self.criar_interface()

    def criar_interface(self):
        entrada = tk.Entry(self.root, textvariable=self.resultado, font=('Arial', 20), bd=10, relief='ridge', justify='right')
        entrada.pack(fill='both', ipadx=8, ipady=8)

        botoes = [
            ['7', '8', '9', '/'],
            ['4', '5', '6', '*'],
            ['1', '2', '3', '-'],
            ['0', '.', '=', '+'],
        ]

        for linha in botoes:
            frame = tk.Frame(self.root)
            frame.pack(expand=True, fill='both')
            for botao in linha:
                tk.Button(frame, text=botao, font=('Arial', 18), relief='ridge', bd=5,
                          command=lambda b=botao: self.acao(b)).pack(side='left', expand=True, fill='both')

        limpar_btn = tk.Button(self.root, text='C', font=('Arial', 18), relief='ridge', bd=5,
                               bg='red', fg='white', command=self.limpar)
        limpar_btn.pack(fill='both', expand=True)

    def acao(self, valor):
        if self.resetar_display and valor not in ['=', '+', '-', '*', '/']:
            self.resultado.set("")
            self.resetar_display = False

        if valor == '=':
            try:
                resultado = str(eval(self.resultado.get()))
                self.resultado.set(resultado)
                self.resetar_display = True
            except:
                self.resultado.set("Erro")
                self.resetar_display = True
        else:
            self.resultado.set(self.resultado.get() + valor)

    def limpar(self):
        self.resultado.set("")
        self.resetar_display = False

if __name__ == "__main__":
    root = tk.Tk()
    app = Calculadora(root)
    root.mainloop()
