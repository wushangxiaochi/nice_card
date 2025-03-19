        // Elements
        const cardTitleInput = document.getElementById('card-title-input');
        const styleTabs = document.querySelectorAll('.style-tab');
        const watermarkInput = document.getElementById('watermark-input');
        const editor = document.getElementById('editor');
        const previewCard = document.getElementById('preview-card');
        const cardTitle = document.getElementById('card-title');
        const cardContent = document.getElementById('card-content');
        const cardWatermark = document.getElementById('card-watermark');
        const cardWidthDisplay = document.getElementById('card-width');
        
        // Toolbar buttons
        const boldBtn = document.getElementById('bold-btn');
        const italicBtn = document.getElementById('italic-btn');
        const underlineBtn = document.getElementById('underline-btn');
        const fontSizeSelect = document.getElementById('font-size');
        const textColor = document.getElementById('text-color');
        const bgColor = document.getElementById('bg-color');
        const alignLeft = document.getElementById('align-left');
        const alignCenter = document.getElementById('align-center');
        const alignRight = document.getElementById('align-right');
        const formatPainter = document.getElementById('format-painter');
        const imageUpload = document.getElementById('image-upload');
        
        // Preview controls
        const narrowBtn = document.getElementById('narrow-btn');
        const widenBtn = document.getElementById('widen-btn');
        const downloadBtn = document.getElementById('download-btn');
        
        // Card width management
        let currentCardWidth = 500; // Initial width in pixels

        // Update preview in real-time
        cardTitleInput.addEventListener('input', () => {
            cardTitle.textContent = cardTitleInput.value || 'Your Card Title';
        });

        watermarkInput.addEventListener('input', () => {
            cardWatermark.textContent = watermarkInput.value || 'Watermark';
        });

        // 修改辅助函数，处理新风格的特殊元素
        function ensureSpecialElements() {
            // 处理新波普风格的特殊元素
            if (previewCard.classList.contains('neopop')) {
                // 添加棋盘格装饰，如果不存在
                let checkerboard = previewCard.querySelector('.checkerboard-decoration');
                if (!checkerboard) {
                    checkerboard = document.createElement('div');
                    checkerboard.className = 'checkerboard-decoration';
                    
                    // 创建三行棋盘格
                    for (let row = 0; row < 3; row++) {
                        const rowDiv = document.createElement('div');
                        rowDiv.className = 'checkerboard-row';
                        
                        // 计算每行需要的方格数量
                        const squaresNeeded = Math.ceil(previewCard.offsetWidth / 15) + 1;
                        
                        // 创建交替的粉色和白色方格
                        for (let i = 0; i < squaresNeeded; i++) {
                            const square = document.createElement('div');
                            square.className = 'checker-square ' + ((row + i) % 2 === 0 ? 'pink' : 'white');
                            rowDiv.appendChild(square);
                        }
                        
                        checkerboard.appendChild(rowDiv);
                    }
                    
                    // 插入到卡片的最前面
                    previewCard.insertBefore(checkerboard, previewCard.firstChild);
                }
                
                // 添加网格背景，如果不存在
                let gridBackground = previewCard.querySelector('.grid-background');
                if (!gridBackground) {
                    gridBackground = document.createElement('div');
                    gridBackground.className = 'grid-background';
                    previewCard.appendChild(gridBackground);
                }
            } else {
                // 如果不是neopop风格，移除棋盘格和网格背景
                const elements = ['.checkerboard-decoration', '.grid-background'];
                elements.forEach(selector => {
                    const el = previewCard.querySelector(selector);
                    if (el) previewCard.removeChild(el);
                });
            }
            
            // 添加蒸汽波风格的特殊元素
            if (previewCard.classList.contains('vaporwave')) {
                // 添加网格背景
                let gridOverlay = previewCard.querySelector('.grid-overlay');
                if (!gridOverlay) {
                    gridOverlay = document.createElement('div');
                    gridOverlay.className = 'grid-overlay';
                    previewCard.appendChild(gridOverlay);
                }
                
                // 添加时间显示
                let digitalTime = previewCard.querySelector('.digital-time');
                if (!digitalTime) {
                    digitalTime = document.createElement('div');
                    digitalTime.className = 'digital-time';
                    digitalTime.textContent = formatTime(new Date());
                    previewCard.appendChild(digitalTime);
                }
                
                // 添加装饰圆形
                let cardDecoration = previewCard.querySelector('.card-decoration');
                if (!cardDecoration) {
                    cardDecoration = document.createElement('div');
                    cardDecoration.className = 'card-decoration';
                    previewCard.appendChild(cardDecoration);
                }
            } else {
                // 如果不是蒸汽波风格，移除相关元素
                const elements = ['.grid-overlay', '.digital-time', '.card-decoration'];
                elements.forEach(selector => {
                    const el = previewCard.querySelector(selector);
                    if (el) previewCard.removeChild(el);
                });
            }
            
            // 添加赛博朋克风格的特殊元素
            if (previewCard.classList.contains('cyberpunk')) {
                // 添加电路线装饰
                let circuitLines = previewCard.querySelector('.circuit-lines');
                if (!circuitLines) {
                    circuitLines = document.createElement('div');
                    circuitLines.className = 'circuit-lines';
                    previewCard.appendChild(circuitLines);
                }
            } else {
                // 如果不是赛博朋克风格，移除相关元素
                const elements = ['.circuit-lines'];
                elements.forEach(selector => {
                    const el = previewCard.querySelector(selector);
                    if (el) previewCard.removeChild(el);
                });
            }
        }
		
		
		// 更新卡片宽度的辅助函数
        function updateCardWidth() {
            previewCard.style.maxWidth = currentCardWidth + 'px';
            cardWidthDisplay.textContent = currentCardWidth;
        }
		
		// Ensure editor has focus when page loads
        window.addEventListener('load', () => {
        
		// Set initial focus to editor
            setTimeout(() => {
                editor.focus();
                
                // Place cursor at the end of the content
                const range = document.createRange();
                const sel = window.getSelection();
                range.selectNodeContents(editor);
                range.collapse(false); // false means collapse to end
                sel.removeAllRanges();
                sel.addRange(range);
            }, 100);
			
		// 确保特殊元素正确显示
        ensureSpecialElements();
});

		// Initialize with default values
        cardTitleInput.value = 'Your Card Title';
        watermarkInput.value = 'Watermark';
        editor.innerHTML = '<p>Start editing to see your content here...</p>';
        cardContent.innerHTML = editor.innerHTML;
		
        // 添加宽度调整功能的事件监听器
        // 放在初始化部分，"Card width management"之后
        narrowBtn.addEventListener('click', () => {
            if (currentCardWidth > 300) {
                currentCardWidth -= 50;
                updateCardWidth();
            }
        });

        widenBtn.addEventListener('click', () => {
            if (currentCardWidth < 800) {
                currentCardWidth += 50;
                updateCardWidth();
            }
        });
		
		// 在编辑器内容变更后调用此函数
        editor.addEventListener('input', () => {
            cardContent.innerHTML = editor.innerHTML;
            
            // 确保特殊元素正确显示
            ensureSpecialElements();
        });