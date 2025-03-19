        // 修改下载函数，添加对新风格的支持
        downloadBtn.addEventListener('click', function() {
            // Show loading indicator
            const originalButtonContent = this.innerHTML;
            this.disabled = true;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            
            // 创建一个函数处理下载，避免使用return中断执行
            function processDownload() {
                try {
                    // Create export container
                    const exportContainer = document.createElement('div');
                    exportContainer.style.position = 'fixed';
                    exportContainer.style.top = '-9999px';
                    exportContainer.style.left = '0';
                    exportContainer.style.width = currentCardWidth + 'px';
                    exportContainer.style.height = 'auto';
                    exportContainer.style.backgroundColor = 'transparent';
                    document.body.appendChild(exportContainer);
                    
                    // Create card container
                    const cardContainer = document.createElement('div');
                    cardContainer.style.width = currentCardWidth + 'px';
                    cardContainer.style.padding = '0';
                    cardContainer.style.margin = '0';
                    cardContainer.style.position = 'relative';
                    cardContainer.style.overflow = 'hidden';
                    
                    // 获取所有可能的样式
                    const isMinimalist = previewCard.classList.contains('minimalist');
                    const isHolographic = previewCard.classList.contains('holographic');
                    const isNeopop = previewCard.classList.contains('neopop');
                    const isDarktech = previewCard.classList.contains('darktech');
                    const isCyberpunk = previewCard.classList.contains('cyberpunk');
                    const isVaporwave = previewCard.classList.contains('vaporwave');
                    
                    // 处理卡片样式
                    const currentStyle = previewCard.className.replace('preview-card', '').trim();
                    
                    // 应用基本样式
                    if (isMinimalist) {
                        // 极简风格 - 保持原样
                        cardContainer.style.backgroundColor = '#ffffff';
                        cardContainer.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
                        cardContainer.style.padding = '20px';
                        cardContainer.style.borderRadius = '0'; // 方形卡片
                        cardContainer.style.border = '4px solid #4a6bff'; // 蓝色边框
                        
                        // 添加顶部红色装饰
                        const topBorder = document.createElement('div');
                        topBorder.style.position = 'absolute';
                        topBorder.style.top = '0';
                        topBorder.style.left = '0';
                        topBorder.style.width = '100%';
                        topBorder.style.height = '4px';
                        topBorder.style.backgroundColor = '#ff6b6b'; // 红色顶部装饰
                        topBorder.style.zIndex = '1';
                        cardContainer.appendChild(topBorder);
                    } else if (isHolographic) {
                        // 全息风格
                        cardContainer.style.backgroundColor = '#314659'; // 固定背景色
                        cardContainer.style.borderRadius = '12px';
                        cardContainer.style.padding = '25px';
                        cardContainer.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
                        
                        // 添加彩虹顶部边框
                        const rainbowBorder = document.createElement('div');
                        rainbowBorder.style.position = 'absolute';
                        rainbowBorder.style.top = '0';
                        rainbowBorder.style.left = '0';
                        rainbowBorder.style.width = '100%';
                        rainbowBorder.style.height = '5px';
                        rainbowBorder.style.background = 'linear-gradient(90deg, #ff0000, #ff9900, #ffff00, #33cc33, #3399ff, #9933ff, #ff00ff)';
                        cardContainer.appendChild(rainbowBorder);
                    } else if (isNeopop) {
                        // NEOPOP STYLE - 方形卡片
                        cardContainer.style.backgroundColor = '#fff';
                        cardContainer.style.border = '3px solid #000';
                        cardContainer.style.borderRadius = '0'; // 方形卡片
                        cardContainer.style.padding = '25px';
                        cardContainer.style.boxShadow = '8px 8px 0 #000';
                        cardContainer.style.marginTop = '8px';
                        cardContainer.style.marginLeft = '8px';
                        cardContainer.style.overflow = 'visible'; // 允许内容溢出，显示完整圆形
                        
                        // 明确添加棋盘格装饰 - 重要修改部分
                        const checkerboard = document.createElement('div');
                        checkerboard.style.position = 'absolute';
                        checkerboard.style.top = '0';
                        checkerboard.style.left = '0';
                        checkerboard.style.right = '0';
                        checkerboard.style.height = '45px';
                        checkerboard.style.display = 'flex';
                        checkerboard.style.flexDirection = 'column';
                        checkerboard.style.zIndex = '0';
                        
                        // 创建三行棋盘格
                        for (let row = 0; row < 3; row++) {
                            const rowDiv = document.createElement('div');
                            rowDiv.style.display = 'flex';
                            rowDiv.style.height = '15px';
                            
                            // 计算每行需要的方格数量
                            const squaresNeeded = Math.ceil(currentCardWidth / 15) + 1;
                            
                            // 创建交替的粉色和白色方格
                            for (let i = 0; i < squaresNeeded; i++) {
                                const square = document.createElement('div');
                                square.style.width = '15px';
                                square.style.height = '15px';
                                square.style.flexShrink = '0';
                                
                                if ((row + i) % 2 === 0) {
                                    square.style.backgroundColor = '#FF61D8'; // 粉色
                                } else {
                                    square.style.backgroundColor = 'white';
                                }
                                
                                rowDiv.appendChild(square);
                            }
                            
                            checkerboard.appendChild(rowDiv);
                        }
                        
                        // 将棋盘格添加到卡片（必须放在最前面）
                        cardContainer.insertBefore(checkerboard, cardContainer.firstChild);
                        
                        // 绿色圆点保留，但提高z-index
                        const greenCircle = document.createElement('div');
                        greenCircle.style.position = 'absolute';
                        greenCircle.style.bottom = '60px';
                        greenCircle.style.right = '15px';
                        greenCircle.style.width = '20px';
                        greenCircle.style.height = '20px';
                        greenCircle.style.backgroundColor = '#4BE3AC'; // 绿色
                        greenCircle.style.borderRadius = '50%';
                        greenCircle.style.zIndex = '3'; // 提高z-index至3，确保在内容上方
                        cardContainer.appendChild(greenCircle);
                        
                        // 添加网格背景 - 调整Z索引确保正确显示
                        const gridBackground = document.createElement('div');
                        gridBackground.style.position = 'absolute';
                        gridBackground.style.top = '0';
                        gridBackground.style.left = '0';
                        gridBackground.style.right = '0';
                        gridBackground.style.bottom = '0';
                        gridBackground.style.backgroundImage = 
                            'linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px), ' +
                            'linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px)';
                        gridBackground.style.backgroundSize = '15px 15px';
                        gridBackground.style.zIndex = '0';
                        gridBackground.style.pointerEvents = 'none';
                        cardContainer.appendChild(gridBackground);
                    } else if (isDarktech) {
                        // 暗黑科技风格
                        cardContainer.style.backgroundColor = '#0a0a0a';
                        cardContainer.style.border = '1px solid #30cfd0';
                        cardContainer.style.borderRadius = '8px';
                        cardContainer.style.padding = '25px';
                        cardContainer.style.boxShadow = '0 0 15px rgba(48, 207, 208, 0.5)';
                        
                        // 添加网格背景
                        const gridOverlay = document.createElement('div');
                        gridOverlay.style.position = 'absolute';
                        gridOverlay.style.top = '0';
                        gridOverlay.style.left = '0';
                        gridOverlay.style.right = '0';
                        gridOverlay.style.bottom = '0';
                        gridOverlay.style.backgroundImage = 
                            'linear-gradient(90deg, rgba(48, 207, 208, 0.1) 1px, transparent 1px), ' +
                            'linear-gradient(rgba(48, 207, 208, 0.1) 1px, transparent 1px)';
                        gridOverlay.style.backgroundSize = '22px 22px';
                        gridOverlay.style.zIndex = '0';
                        cardContainer.appendChild(gridOverlay);
                    } else if (isCyberpunk) {
                        // 赛博朋克风格 - 增强发光效果
                        
                        // 创建发光外层容器
                        const glowContainer = document.createElement('div');
                        glowContainer.style.position = 'absolute';
                        glowContainer.style.top = '0';
                        glowContainer.style.left = '0';
                        glowContainer.style.right = '0';
                        glowContainer.style.bottom = '0';
                        glowContainer.style.padding = '8px'; // 为发光效果留出空间
                        glowContainer.style.borderRadius = '12px';
                        glowContainer.style.backgroundColor = 'transparent';
                        glowContainer.style.zIndex = '0';
                        
                        // 创建第一层发光效果
                        const outerGlow = document.createElement('div');
                        outerGlow.style.position = 'absolute';
                        outerGlow.style.top = '0';
                        outerGlow.style.left = '0';
                        outerGlow.style.right = '0';
                        outerGlow.style.bottom = '0';
                        outerGlow.style.border = '4px solid rgba(255, 0, 255, 0.5)';
                        outerGlow.style.borderRadius = '9px';
                        outerGlow.style.filter = 'blur(3px)';
                        outerGlow.style.zIndex = '0';
                        glowContainer.appendChild(outerGlow);
                        
                        // 创建第二层发光效果
                        const innerGlow = document.createElement('div');
                        innerGlow.style.position = 'absolute';
                        innerGlow.style.top = '4px';
                        innerGlow.style.left = '4px';
                        innerGlow.style.right = '4px';
                        innerGlow.style.bottom = '4px';
                        innerGlow.style.border = '2px solid rgba(0, 255, 252, 0.8)';
                        innerGlow.style.borderRadius = '7px';
                        innerGlow.style.filter = 'blur(2px)';
                        innerGlow.style.zIndex = '0';
                        glowContainer.appendChild(innerGlow);
                        
                        // 添加发光容器到主容器
                        cardContainer.appendChild(glowContainer);
                        
                        // 设置主卡片容器样式
                        cardContainer.style.background = 'linear-gradient(135deg, #0b0b2a 0%, #1a1a3a 100%)';
                        cardContainer.style.color = '#00fffc';
                        cardContainer.style.border = '1px solid #ff00ff';
                        cardContainer.style.borderRadius = '5px';
                        cardContainer.style.padding = '25px';
                        cardContainer.style.position = 'relative';
                        cardContainer.style.overflow = 'hidden';
                        cardContainer.style.zIndex = '1';
                        
                        // 添加网格背景
                        const gridOverlay = document.createElement('div');
                        gridOverlay.style.position = 'absolute';
                        gridOverlay.style.top = '0';
                        gridOverlay.style.left = '0';
                        gridOverlay.style.right = '0';
                        gridOverlay.style.bottom = '0';
                        gridOverlay.style.backgroundImage = 
                            'linear-gradient(rgba(255, 0, 255, 0.1) 1px, transparent 1px), ' +
                            'linear-gradient(90deg, rgba(255, 0, 255, 0.1) 1px, transparent 1px)';
                        gridOverlay.style.backgroundSize = '20px 20px';
                        gridOverlay.style.pointerEvents = 'none';
                        gridOverlay.style.zIndex = '0';
                        cardContainer.appendChild(gridOverlay);
                        
                        // 添加电路线装饰
                        const circuitLines = document.createElement('div');
                        circuitLines.style.position = 'absolute';
                        circuitLines.style.bottom = '20px';
                        circuitLines.style.left = '20px';
                        circuitLines.style.width = '100px';
                        circuitLines.style.height = '50px';
                        circuitLines.style.borderBottom = '2px solid #00fffc';
                        circuitLines.style.borderLeft = '2px solid #00fffc';
                        circuitLines.style.zIndex = '0';
                        circuitLines.style.opacity = '0.7';
                        cardContainer.appendChild(circuitLines);
                        
                        // 添加标题
                        const titleElement = document.createElement('div');
                        titleElement.style.color = '#ff00ff';
                        titleElement.style.textShadow = '0 0 10px #ff00ff';
                        titleElement.style.fontFamily = 'Arial, sans-serif';
                        titleElement.style.fontWeight = '700';
                        titleElement.style.position = 'relative';
                        titleElement.style.zIndex = '1';
                        titleElement.style.borderLeft = '3px solid #00fffc';
                        titleElement.style.paddingLeft = '15px';
                        titleElement.style.marginBottom = '25px';
                        titleElement.style.fontSize = '1.5rem';
                        titleElement.innerHTML = cardTitle.innerHTML;
                        cardContainer.appendChild(titleElement);
                        
                        // 添加内容
                        const contentElement = document.createElement('div');
                        contentElement.style.backgroundColor = 'rgba(10, 10, 43, 0.7)';
                        contentElement.style.border = '1px solid #00fffc';
                        contentElement.style.borderRadius = '5px';
                        contentElement.style.padding = '20px';
                        contentElement.style.color = '#00fffc';
                        contentElement.style.textShadow = '0 0 5px rgba(0, 255, 252, 0.7)';
                        contentElement.style.position = 'relative';
                        contentElement.style.zIndex = '1';
                        contentElement.style.boxShadow = '0 0 10px rgba(0, 255, 252, 0.3)';
                        contentElement.innerHTML = cardContent.innerHTML;
                        cardContainer.appendChild(contentElement);
                        
                        // 添加水印
                        const watermarkElement = document.createElement('div');
                        watermarkElement.style.position = 'absolute';
                        watermarkElement.style.bottom = '10px';
                        watermarkElement.style.right = '10px';
                        watermarkElement.style.fontSize = '0.8rem';
                        watermarkElement.style.opacity = '0.7';
                        watermarkElement.style.zIndex = '2';
                        watermarkElement.style.color = '#ff00ff';
                        watermarkElement.style.textShadow = '0 0 5px #ff00ff';
                        watermarkElement.innerHTML = cardWatermark.innerHTML;
                        cardContainer.appendChild(watermarkElement);
                    } else if (isVaporwave) {
                        // 蒸汽波风格
                        cardContainer.style.background = 'linear-gradient(to bottom, #c774e8 0%, #94a6fe 100%)';
                        cardContainer.style.color = 'white';
                        cardContainer.style.border = '4px solid #0ff';
                        cardContainer.style.borderRadius = '0';
                        cardContainer.style.boxShadow = '0 0 0 2px #ff71ce, 0 0 25px rgba(0, 255, 255, 0.5)';
                        cardContainer.style.position = 'relative';
                        cardContainer.style.overflow = 'hidden';
                        cardContainer.style.padding = '25px';
                        
                        // 添加上边缘渐变条
                        const topGradient = document.createElement('div');
                        topGradient.style.position = 'absolute';
                        topGradient.style.top = '0';
                        topGradient.style.left = '0';
                        topGradient.style.right = '0';
                        topGradient.style.height = '8px';
                        topGradient.style.background = 'linear-gradient(90deg, transparent 0%, #0ff 10%, #ff71ce 30%, transparent 40%, #0ff 60%, #ff71ce 80%, transparent 100%)';
                        topGradient.style.zIndex = '1';
                        cardContainer.appendChild(topGradient);
                        
                        // 添加下边缘渐变条
                        const bottomGradient = document.createElement('div');
                        bottomGradient.style.position = 'absolute';
                        bottomGradient.style.bottom = '0';
                        bottomGradient.style.left = '0';
                        bottomGradient.style.right = '0';
                        bottomGradient.style.height = '8px';
                        bottomGradient.style.background = 'linear-gradient(90deg, transparent 0%, #0ff 10%, #ff71ce 30%, transparent 40%, #0ff 60%, #ff71ce 80%, transparent 100%)';
                        bottomGradient.style.zIndex = '1';
                        cardContainer.appendChild(bottomGradient);
                        
                        // 添加网格背景
                        const gridOverlay = document.createElement('div');
                        gridOverlay.style.position = 'absolute';
                        gridOverlay.style.top = '0';
                        gridOverlay.style.left = '0';
                        gridOverlay.style.right = '0';
                        gridOverlay.style.bottom = '0';
                        gridOverlay.style.backgroundImage = 
                            'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), ' +
                            'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)';
                        gridOverlay.style.backgroundSize = '20px 20px';
                        gridOverlay.style.pointerEvents = 'none';
                        gridOverlay.style.zIndex = '0';
                        cardContainer.appendChild(gridOverlay);
                        
                        // 添加数字时间显示
                        const digitalTime = document.createElement('div');
                        digitalTime.style.position = 'absolute';
                        digitalTime.style.top = '15px';
                        digitalTime.style.right = '15px';
                        digitalTime.style.fontFamily = 'Courier New, monospace';
                        digitalTime.style.fontSize = '1rem';
                        digitalTime.style.color = '#fff';
                        digitalTime.style.background = 'rgba(1, 205, 254, 0.2)';
                        digitalTime.style.padding = '5px 10px';
                        digitalTime.style.border = '1px solid #01cdfe';
                        digitalTime.style.zIndex = '2';
                        digitalTime.textContent = formatTime(new Date());
                        cardContainer.appendChild(digitalTime);
                        
                        // 添加装饰圆形
                        const cardDecoration = document.createElement('div');
                        cardDecoration.style.position = 'absolute';
                        cardDecoration.style.bottom = '60px';
                        cardDecoration.style.right = '25px';
                        cardDecoration.style.width = '80px';
                        cardDecoration.style.height = '80px';
                        cardDecoration.style.borderRadius = '50%';
                        cardDecoration.style.background = 'linear-gradient(45deg, #ff71ce, #ff71ce 50%, #01cdfe 50%, #01cdfe)';
                        cardDecoration.style.zIndex = '1';
                        cardDecoration.style.boxShadow = '0 0 15px rgba(1, 205, 254, 0.5)';
                        cardContainer.appendChild(cardDecoration);
                        
                        // 添加标题
                        const titleElement = document.createElement('div');
                        titleElement.style.color = 'white';
                        titleElement.style.fontSize = '2rem';
                        titleElement.style.fontWeight = 'bold';
                        titleElement.style.textShadow = '3px 3px 0 #ff71ce, 6px 6px 0 #01cdfe';
                        titleElement.style.letterSpacing = '2px';
                        titleElement.style.marginBottom = '25px';
                        titleElement.style.textTransform = 'uppercase';
                        titleElement.style.position = 'relative';
                        titleElement.style.zIndex = '2';
                        titleElement.innerHTML = cardTitle.innerHTML.toUpperCase(); // 转为大写
                        cardContainer.appendChild(titleElement);
                        
                        // 添加内容
                        const contentElement = document.createElement('div');
                        contentElement.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                        contentElement.style.border = '2px solid #01cdfe';
                        contentElement.style.padding = '20px';
                        contentElement.style.position = 'relative';
                        contentElement.style.textShadow = '1px 1px 0 #01cdfe';
                        contentElement.style.zIndex = '2';
                        contentElement.style.marginBottom = '20px';
                        contentElement.innerHTML = cardContent.innerHTML;
                        cardContainer.appendChild(contentElement);
                        
                        // 添加水印
                        const watermarkElement = document.createElement('div');
                        watermarkElement.style.position = 'absolute';
                        watermarkElement.style.bottom = '10px';
                        watermarkElement.style.right = '10px';
                        watermarkElement.style.fontSize = '0.8rem';
                        watermarkElement.style.opacity = '0.7';
                        watermarkElement.style.zIndex = '2';
                        watermarkElement.style.color = '#fff';
                        watermarkElement.style.textShadow = '2px 2px 0 #ff71ce';
                        watermarkElement.style.fontStyle = 'italic';
                        watermarkElement.innerHTML = cardWatermark.innerHTML;
                        cardContainer.appendChild(watermarkElement);
                    }
                    
                    // 除了赛博朋克和蒸汽波风格外，其他风格需要添加内容元素
                    if (!isCyberpunk && !isVaporwave) {
                        // 添加标题
                        const titleElement = document.createElement('div');
                        titleElement.style.fontSize = '1.5rem';
                        titleElement.style.fontWeight = 'bold';
                        titleElement.style.marginBottom = '15px';
                        titleElement.style.position = 'relative';
                        titleElement.style.zIndex = '2';
                        
                        // 根据不同风格应用不同的标题样式
                        if (isMinimalist) {
                            titleElement.style.color = '#333';
                        } else if (isHolographic) {
                            titleElement.style.color = 'white';
                            titleElement.style.textShadow = '0 2px 4px rgba(0,0,0,0.3)';
                            titleElement.style.marginBottom = '20px';
                        } else if (isNeopop) {
                            titleElement.style.position = 'relative';
                            titleElement.style.zIndex = '2';
                            titleElement.style.color = '#000';
                            titleElement.style.fontWeight = '800';
                            titleElement.style.marginBottom = '20px';
                            titleElement.style.fontSize = '1.8rem';
                            titleElement.style.padding = '5px 10px';
                            titleElement.style.backgroundColor = '#56CCF2';
                            titleElement.style.display = 'inline-block';
                            titleElement.style.border = '3px solid #000';
                        } else if (isDarktech) {
                            titleElement.style.color = '#30cfd0';
                            titleElement.style.fontWeight = '600';
                            titleElement.style.marginBottom = '25px';
                            titleElement.style.textShadow = '0 0 10px rgba(48, 207, 208, 0.7)';
                            titleElement.style.fontFamily = 'Courier New, monospace';
                            titleElement.style.paddingLeft = '15px';
                            titleElement.style.borderLeft = '3px solid #30cfd0';
                        }
                        
                        titleElement.innerHTML = cardTitle.innerHTML;
                        cardContainer.appendChild(titleElement);
                        
                        // 添加内容
                            const contentElement = document.createElement('div');
                            contentElement.style.marginBottom = '20px';
                            contentElement.style.position = 'relative';
                            contentElement.style.zIndex = '2';
                        
                        // 根据不同风格应用不同的内容样式
                        if (isMinimalist) {
                            contentElement.style.color = '#292929';
                        } else if (isHolographic) {
                            contentElement.style.backgroundColor = 'rgba(255, 255, 255, 0.75)';
                            contentElement.style.color = '#292929';
                            contentElement.style.borderRadius = '8px';
                            contentElement.style.padding = '20px';
                            contentElement.style.margin = '15px 0';
                            contentElement.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                            contentElement.style.border = '2px solid #9933ff';
                        } else if (isNeopop) {
                            contentElement.style.backgroundColor = '#FBD348';
                            contentElement.style.color = '#292929';
                            contentElement.style.border = '3px solid #000';
                            contentElement.style.padding = '20px';
                            contentElement.style.margin = '20px 0 30px';
                            contentElement.style.boxShadow = '5px 5px 0 #000';
                            contentElement.style.position = 'relative';
                            contentElement.style.zIndex = '1';
                        } else if (isDarktech) {
                            contentElement.style.backgroundColor = 'rgba(10, 10, 10, 0.8)';
                            contentElement.style.border = '1px solid #30cfd0';
                            contentElement.style.borderRadius = '5px';
                            contentElement.style.padding = '20px';
                            contentElement.style.margin = '10px 0 20px';
                            contentElement.style.color = '#ffffff';
                            contentElement.style.fontFamily = 'Courier New, monospace';
                            contentElement.style.boxShadow = '0 0 10px rgba(48, 207, 208, 0.3)';
                        }
                        
                            contentElement.innerHTML = cardContent.innerHTML;
                            cardContainer.appendChild(contentElement);
                        
                        // 添加水印
                        const watermarkElement = document.createElement('div');
                        watermarkElement.style.position = 'absolute';
                        watermarkElement.style.bottom = '10px';
                        watermarkElement.style.right = '10px';
                        watermarkElement.style.fontSize = '0.8rem';
                        watermarkElement.style.opacity = '0.5';
                        watermarkElement.style.fontStyle = 'italic';
                        watermarkElement.style.zIndex = '2';
                        
                        // 根据不同风格应用不同的水印样式
                        if (isMinimalist) {
                            watermarkElement.style.color = '#888';
                        } else if (isHolographic) {
                            watermarkElement.style.color = 'rgba(255, 255, 255, 0.7)';
                        } else if (isNeopop) {
                            watermarkElement.style.color = '#555';
                            watermarkElement.style.fontWeight = 'bold';
                        } else if (isDarktech) {
                            watermarkElement.style.color = '#30cfd0';
                            watermarkElement.style.fontFamily = 'Courier New, monospace';
                        }
                        
                        watermarkElement.innerHTML = cardWatermark.innerHTML;
                        cardContainer.appendChild(watermarkElement);
                        
                        // 如果是新波普风格，创建和添加圆形装饰
                        if (isNeopop) {
                            // 添加左上圆形装饰 - 与CSS .card-content::before对应
                        const topCircle = document.createElement('div');
                        topCircle.style.position = 'absolute';
                        topCircle.style.left = '15px';
                            topCircle.style.top = contentElement.offsetTop - 15 + 'px'; // 动态计算，根据内容区位置
                        topCircle.style.width = '30px';
                        topCircle.style.height = '30px';
                            topCircle.style.backgroundColor = '#ff6b6b'; // 粉色
                        topCircle.style.border = '3px solid #000';
                        topCircle.style.borderRadius = '50%';
                            topCircle.style.zIndex = '3';
                        
                            // 添加右下圆形装饰 - 与CSS .card-content::after对应
                        const bottomCircle = document.createElement('div');
                        bottomCircle.style.position = 'absolute';
                        bottomCircle.style.right = '15px';
                            bottomCircle.style.bottom = contentElement.offsetTop + contentElement.offsetHeight - 15 + 'px'; // 动态计算
                        bottomCircle.style.width = '30px';
                        bottomCircle.style.height = '30px';
                            bottomCircle.style.backgroundColor = '#4a6bff'; // 蓝色
                        bottomCircle.style.border = '3px solid #000';
                        bottomCircle.style.borderRadius = '50%';
                            bottomCircle.style.zIndex = '3';
                            
                            // 延迟添加圆形，确保内容区位置已经计算
                            setTimeout(() => {
                                contentElement.appendChild(topCircle);
                                contentElement.appendChild(bottomCircle);
                            }, 50);
                        }
                    }
                    
                    // 添加卡片到导出容器
                    exportContainer.appendChild(cardContainer);
                    
                    // 处理渲染和下载
                    setTimeout(() => {
                        const cardHeight = cardContainer.offsetHeight;
                        exportContainer.style.height = (cardHeight + 10) + 'px';
                        
                        // 配置html2canvas选项
                        let options = {
                            scale: 2,
                            logging: true,
                            useCORS: true,
                            allowTaint: true,
                            backgroundColor: null,
                            onclone: function(clonedDoc) {
                                // 确保克隆的元素样式正确
                                const clonedCard = clonedDoc.querySelector('div');
                                if (clonedCard) {
                                    clonedCard.style.margin = '0';
                                    
                                    // 特别处理新波普风格
                                    if (isNeopop) {
                                        clonedCard.style.borderRadius = '0'; // 确保方形
                                        clonedCard.style.overflow = 'visible'; // 允许圆形显示
                                        
                                        // 确保网格背景正确显示
                                        const gridBg = clonedCard.querySelector('.grid-background');
                                        if (gridBg) {
                                            gridBg.style.backgroundImage = 
                                                'linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px), ' +
                                                'linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px)';
                                            gridBg.style.backgroundSize = '15px 15px';
                                        }
                                    }
                                }
                            }
                        };
                        
                        // 修改特定风格的背景色设置
                        if (isMinimalist || isNeopop) {
                            options.backgroundColor = '#ffffff';
                        } else if (isCyberpunk) {
                            // 确保赛博朋克的深色背景正确渲染
                            options.backgroundColor = '#0b0b2a';
                        } else if (isVaporwave) {
                            // 确保蒸汽波的渐变背景能够正确捕获
                            options.backgroundColor = null;
                        }
                        
                        html2canvas(cardContainer, options).then(canvas => {
                            try {
                                const imgData = canvas.toDataURL('image/png');
                                const link = document.createElement('a');
                                link.href = imgData;
                                const fileName = cardTitle.textContent.replace(/\s+/g, '-').toLowerCase() || 'knowledge-card';
                                link.download = fileName + '-card.png';
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                            } catch (e) {
                                console.error('Error creating download link:', e);
                                alert('Error creating download link. Please try again.');
                            }
                            
                            document.body.removeChild(exportContainer);
                            downloadBtn.disabled = false;
                            downloadBtn.innerHTML = originalButtonContent;
                        }).catch(error => {
                            console.error('html2canvas error:', error);
                            alert('Failed to generate image. Error: ' + error.message);
                            document.body.removeChild(exportContainer);
                            downloadBtn.disabled = false;
                            downloadBtn.innerHTML = originalButtonContent;
                        });
                    }, 200);
                } catch (error) {
                    console.error('Unexpected error in card export:', error);
                    alert('An unexpected error occurred: ' + error.message);
                    downloadBtn.disabled = false;
                    downloadBtn.innerHTML = originalButtonContent;
                }
            }
            
            // 执行下载处理
            processDownload();
        });