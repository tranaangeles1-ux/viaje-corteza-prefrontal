# 🧠 Viaje a la Corteza Prefrontal

Un juego interactivo educativo diseñado para desafiar tu cerebro, activar tus neuronas y potenciar tu plasticidad cerebral.

## 🎮 Características

✨ **Tablero Interactivo** - 40 casillas con categorías de desafíos
🎲 **Dado Virtual** - Sistema de movimiento basado en aleatoridad
🧠 **3 Tipos de Desafíos**:
  - 🔴 Trivia de Neurociencia
  - 🔵 Retos de Memoria
  - 🟢 Acciones Emocionales/Motoras

🎯 **Sistema de Recompensas**:
  - 🏅 Medallas de Plasticidad Cerebral
  - 🛡️ Escudos Neurotransmisores

⚡ **Casillas Especiales**:
  - Sinapsis Súper Sónica: +2 casillas
  - Efecto Dopamina: Gana un escudo protector

🎵 **Feedback Audiovisual** - Sonidos y animaciones inmersivas

## 🚀 Instalación Local

### Requisitos
- Node.js 14+
- npm o yarn

### Pasos

1. **Clona el repositorio**
```bash
git clone https://github.com/tranaangeles1-ux/viaje-corteza-prefrontal.git
cd viaje-corteza-prefrontal
```

2. **Instala las dependencias**
```bash
npm install
```

3. **Inicia el servidor de desarrollo**
```bash
npm start
```

4. **Abre en tu navegador**
```
http://localhost:3000
```

## 📋 Cómo Jugar

### 1. Selecciona Avatares
- Elige entre 2 y 4 jugadores
- Cada jugador puede personalizar su nombre
- 8 avatares disponibles: Neurona, DNA, Rocket, Mago, Caballero, Fénix, Delfín, Águila

### 2. Comienza el Juego
- Posición inicial: Lóbulo Occipital (casilla 0)
- Meta: La Corteza Prefrontal (casilla 39)
- Por turnos, los jugadores hacen clic en el dado para avanzar

### 3. Responde Desafíos
- Cada casilla (excepto especiales) presenta un desafío
- Las respuestas correctas ganan 🏅 Medallas
- Las incorrectas hacen retroceder 2 casillas (o usan un escudo)

### 4. Gana
**Condición de Victoria**: 
- Ser el primero en llegar a La Corteza Prefrontal
- **CON MÍNIMO 3 MEDALLAS DE PLASTICIDAD CEREBRAL**

> 💡 El verdadero triunfo radica en el aprendizaje, esfuerzo y proceso.

## 🏗️ Estructura del Proyecto

```
src/
├── components/
│   ├── App.tsx                 # Componente principal
│   ├── AvatarSelection.tsx     # Selección de avatares
│   ├── GameBoard.tsx           # Tablero principal
│   ├── GameBoardSquares.tsx    # Casillas del tablero
│   ├── ChallengeModal.tsx      # Modal de desafíos
│   ├── ScoreBoard.tsx          # Marcador de puntuación
│   ├── GameOver.tsx            # Pantalla de victoria
│   └── Dice.tsx                # Componente del dado
├── styles/
│   ├── *.css                   # Estilos de componentes
│   └── index.css               # Estilos globales
├── data/
│   └── challenges.ts           # Base de datos de desafíos
├── utils/
│   └── SoundManager.ts         # Gestor de sonidos Web Audio API
├── App.tsx
└── index.tsx
```

## 🎯 Desafíos Incluidos

### Trivia de Neurociencia (5)
- Conceptos básicos del cerebro
- Estructura y funciones neuronales
- Neurotransmisores y sinapsis

### Reto de Memoria (4)
- Secuencias visuales
- Retención de información
- Comprensión de reglas

### Acción Emocional/Motora (5)
- Búsquedas atencionales
- Retos de respiración
- Movimientos coordinados
- Expresión emocional

## 🎨 Diseño y UX

- **Interfaz amigable** para niños de primaria
- **Colores vibrantes** y emojis motivadores
- **Animaciones fluidas** que no saturan
- **Retroalimentación inmediata** visual y sonora
- **Responsive design** para tablets y escritorio

## 🔊 Sistema de Sonidos

Utiliza Web Audio API para generar tonos sincronizados:
- 🎲 Rodar el dado
- ✅ Respuesta correcta
- ❌ Respuesta incorrecta
- 🏆 Victoria
- ⚡ Bonus especial
- 🛡️ Escudo obtenido

## 📱 Tecnologías

- **React 18** - Framework UI
- **TypeScript** - Type safety
- **CSS3** - Estilos y animaciones
- **Web Audio API** - Sonidos generativos
- **Responsive Design** - Mobile & Desktop

## 🚢 Deploy

### Netlify (Recomendado)

1. **Instala Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **Build del proyecto**
```bash
npm run build
```

3. **Deploy**
```bash
netlify deploy --prod --dir=build
```

### Vercel

1. **Push a GitHub** (ya hecho)
2. Ve a [vercel.com](https://vercel.com)
3. Conecta tu repositorio
4. Vercel automáticamente detectará React y deployará

### GitHub Pages

```bash
npm run build
npm run deploy
```

## 📊 Estadísticas del Juego

- **Tablero**: 40 casillas
- **Avatares**: 8 opciones
- **Desafíos**: 14 total
- **Medallas requeridas**: 3 (mínimo)
- **Jugadores**: 2-4
- **Duración**: 15-30 minutos

## 🎓 Objetivos Pedagógicos

✅ Estimular la plasticidad cerebral mediante aprendizaje lúdico
✅ Potenciar la memoria de trabajo
✅ Desarrollar habilidades de atención sostenida
✅ Introducir conceptos de neurociencia de forma divertida
✅ Fomentar trabajo colaborativo y competencia sana
✅ Integrar movimiento físico con aprendizaje cognitivo

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el repositorio
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📝 Licencia

MIT License - Ver archivo LICENSE para más detalles

## 👨‍💼 Autor

Diseñado y desarrollado con ❤️ para potenciar la plasticidad cerebral

---

**¡Prepara tu avatar y que comience la sinapsis!** 🧠✨
