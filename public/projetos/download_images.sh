#!/bin/bash

# Download Criatura images
echo "Downloading Criatura images..."
wget -q "https://raw.githubusercontent.com/pedroblayaluz/pedroblayaluz.github.io/main/assets/images/projetos/criatura/01.jpg" -O "criatura/01.jpg"
wget -q "https://raw.githubusercontent.com/pedroblayaluz/pedroblayaluz.github.io/main/assets/images/projetos/criatura/criatura.png" -O "criatura/criatura.png"

# Download Sta Marta images
echo "Downloading Santa Marta images..."
for i in 01 02 03 04 05 06 07 08 09; do
  wget -q "https://raw.githubusercontent.com/pedroblayaluz/pedroblayaluz.github.io/main/assets/images/projetos/sta_marta/$i.jpg" -O "sta_marta/$i.jpg"
done
wget -q "https://raw.githubusercontent.com/pedroblayaluz/pedroblayaluz.github.io/main/assets/images/projetos/sta_marta/03.png" -O "sta_marta/03.png"

echo "Done!"
