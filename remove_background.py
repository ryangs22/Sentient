import os
import shutil
from PIL import Image

src_folder = os.path.join('public', 'logos')
dst_folder = os.path.join('public', 'logos-transparent')

if os.path.exists(dst_folder):
    shutil.rmtree(dst_folder)
shutil.copytree(src_folder, dst_folder)

print(f"Processando imagens originais de '{src_folder}' para '{dst_folder}'...")

for filename in os.listdir(dst_folder):
    if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
        filepath = os.path.join(dst_folder, filename)
        
        try:
            img = Image.open(filepath).convert("RGBA")
            gray = img.convert("L")
            
            new_img = Image.new("RGBA", img.size, (0, 0, 0, 0))
            
            img_data = img.getdata()
            gray_data = gray.getdata()
            new_data = []

            is_trajetoria = (filename == 'trajetoriaEstelar.png')

            for i in range(len(img_data)):
                luminance = gray_data[i]
                
                # Remove o fundo preto (luminosidade muito baixa)
                if luminance < 15:
                    new_data.append((0, 0, 0, 0))
                else:
                    if is_trajetoria:
                        # REGRA DA ESTRELA: Remove marca d'água cinza forçando branco puro
                        alpha = 255 if luminance > 40 else int((luminance / 40) * 255)
                        new_data.append((255, 255, 255, alpha))
                    else:
                        # REGRA DOS LOGOS PADRÕES: Usa a luminosidade original para criar bordas suaves
                        new_data.append((255, 255, 255, luminance)) 

            novo_nome = os.path.splitext(filepath)[0] + '.png'
            new_img.putdata(new_data)
            new_img.save(novo_nome, 'PNG')
            
            if filepath != novo_nome:
                os.remove(filepath)
                
            print(f"{filename} -> Processado com qualidade máxima.")
            
        except Exception as e:
            print(f"Erro ao processar {filename}: {e}")

print("\nProcesso finalizado com sucesso!")