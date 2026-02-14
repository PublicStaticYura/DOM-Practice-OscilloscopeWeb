const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

        // Элементы интерфейса
        const inpAmp = document.getElementById('inpAmp');
        const inpK = document.getElementById('inpK');
        const inpOmega = document.getElementById('inpOmega');
        const valT = document.getElementById('valT');
        const valF = document.getElementById('valF');

        let time = 0; // время

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.onresize = resize;
        resize();

        function drawGrid() {
            const centerY = canvas.height / 2;
            const step = 50;
            
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(0, 255, 204, 0.1)';
            ctx.lineWidth = 1;

            for(let i=0; i<canvas.width; i+=step) {
                ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height);
            }
            for(let j=0; j<canvas.height; j+=step) {
                ctx.moveTo(0, j); ctx.lineTo(canvas.width, j);
            }
            ctx.stroke();

            // Ось X
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(0, 255, 204, 0.4)';
            ctx.moveTo(0, centerY);
            ctx.lineTo(canvas.width, centerY);
            ctx.stroke();
        }

        function animate() {
            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            drawGrid();

            // инпуты
            const A = parseFloat(inpAmp.value) || 0;
            const k = parseFloat(inpK.value) || 0;
            const omega = parseFloat(inpOmega.value) || 0;

            // Расчет
            valT.innerText = (k !== 0) ? (Math.PI * 2 / k).toFixed(1) : "∞";
            valF.innerText = (omega / (Math.PI * 2)).toFixed(3);

            const centerY = canvas.height / 2;

            ctx.beginPath();
            ctx.lineWidth = 3;
            ctx.strokeStyle = '#00ffcc';
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#00ffcc';

            for (let x = 0; x < canvas.width; x++) {
                // y = A * sin(k*x - omega*t)
                const y = centerY + Math.sin(x * k - time) * A;

                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }

            ctx.stroke();
            ctx.shadowBlur = 0;

            // Обновляем времэс
            time += omega;

            requestAnimationFrame(animate);
        }

        animate();