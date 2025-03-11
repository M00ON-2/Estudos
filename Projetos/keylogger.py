import threading
from pynput.keyboard import Listener

def se_press(key):
    print(str(key))

with Listener(on_press=se_press) as listener:
    listener.join()
