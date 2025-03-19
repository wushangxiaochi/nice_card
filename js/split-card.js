// 拆分卡片功能

// 测试脚本加载
console.log("Split card script loaded!");

// 全局变量
let splitModal = null;
let originalCardWrapper = null;
let splitCardsContainer = null;
let splitPoints = [];
// 不要重新声明previewCard，而是使用已有的变量
// let previewCard = null;  // 删除这一行
let currentCardStyle = null;

// 初始化拆分功能
function initSplitCardFeature() {
    console.log("Initializing split card feature");
    
    // 获取DOM元素
    const splitBtn = document.getElementById('split-btn');
    splitModal = document.getElementById('split-modal');
    const closeBtn = document.querySelector('.split-modal-close');
    const cancelBtn = document.getElementById('split-cancel-btn');
    const downloadAllBtn = document.getElementById('split-download-all-btn');
    originalCardWrapper = document.getElementById('original-card-wrapper');
    splitCardsContainer = document.querySelector('.split-cards-container');
    
    // 更新模态框按钮
    updateModalButtons();
    
    // 添加事件监听器
    if (splitBtn) {
        splitBtn.addEventListener('click', handleSplitButtonClick);
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeSplitModal);
    }
    
    // 点击模态框外部关闭
    window.addEventListener('click', (event) => {
        if (event.target === splitModal) {
            closeSplitModal();
        }
    });
}

// 处理拆分按钮点击
function handleSplitButtonClick() {
    console.log("Split button click handler called");
    
    // 获取当前卡片样式
    currentCardStyle = previewCard.className.split(' ').find(cls => 
        ['minimalist', 'holographic', 'neopop', 'darktech', 'cyberpunk', 'vaporwave'].includes(cls)
    );
    
    console.log("Current card style:", currentCardStyle);
    
    // 仅对极简风格生效
    if (currentCardStyle === 'minimalist') {
        console.log("Showing split preview modal");
        // 显示拆分预览模态框
        splitModal.style.display = 'block';
        
        // 复制原卡片到预览区域
        originalCardWrapper.innerHTML = '';
        const cardClone = previewCard.cloneNode(true);
        cardClone.style.transform = 'none';
        cardClone.style.margin = '0 auto';
        originalCardWrapper.appendChild(cardClone);
        
        // 计算初始分割点并显示分割线
        calculateInitialSplitPoints();
        renderSplitLines();
        
        // 生成拆分预览
        generateSplitPreviews();
    } else {
        alert('Split feature is only available for Minimalist style cards');
    }
}

// 关闭拆分模态框
function closeSplitModal() {
    splitModal.style.display = 'none';
}

// 确认拆分
function confirmSplit() {
    // 处理确认拆分逻辑（将在后续实现）
    console.log('Confirmed split with points:', splitPoints);
    closeSplitModal();
}

// 更新生成拆分预览函数 - 最终修复版本
function generateSplitPreviews() {
    console.log("Generating split previews - final fixed version");
    
    // 使用默认值
    const contentOverlap = 20;
    const positionCorrection = -10;
    
    // 记录当前的滚动位置
    const currentScrollTop = splitCardsContainer.scrollTop;
    
    // 清空预览容器
    splitCardsContainer.innerHTML = '';
    
    // 如果没有分割点，显示提示信息
    if (splitPoints.length === 0) {
        const noSplitsMsg = document.createElement('div');
        noSplitsMsg.textContent = 'Card is too short to split or no safe split points found.';
        noSplitsMsg.style.padding = '20px';
        noSplitsMsg.style.textAlign = 'center';
        splitCardsContainer.appendChild(noSplitsMsg);
        return;
    }
    
    // 获取原始卡片
    const originalCardElement = document.getElementById('preview-card');
    if (!originalCardElement) {
        console.error("Preview card element not found!");
        return;
    }
    
    const originalCardHeight = originalCardElement.offsetHeight;
    const originalCardWidth = originalCardElement.offsetWidth;
    
    // 获取卡片标题和水印的高度，用于位置补偿计算
    const cardTitle = originalCardElement.querySelector('.card-title');
    const cardWatermark = originalCardElement.querySelector('.card-watermark');
    const titleHeight = cardTitle ? cardTitle.offsetHeight : 0;
    const watermarkHeight = cardWatermark ? cardWatermark.offsetHeight : 0;
    
    // 计算内容区域的偏移量（标题高度 + 内容区域的padding)
    const contentAreaTopOffset = titleHeight + 20;
    
    // 创建分割点数组（包含开始和结束点）
    const breakPoints = [0, ...splitPoints, originalCardHeight];
    
    // 计算分割后的卡片数量
    const numberOfCards = breakPoints.length - 1;
    console.log(`Generating ${numberOfCards} preview cards with these break points:`, breakPoints);
    
    // 视觉扩展区域大小
    const visualExtension = 50;
    
    // 缩放因子 - 与卡片预览的scale值匹配
    const scaleFactor = 0.8;
    
    // 捕获原始卡片的样式，确保复制所有相关样式
    const computedStyle = window.getComputedStyle(originalCardElement);
    const cardBackgroundColor = computedStyle.backgroundColor;
    const cardBorderRadius = computedStyle.borderRadius;
    const cardBorder = computedStyle.border || '1px solid #e0e0e0';
    const cardBoxShadow = computedStyle.boxShadow || '0 2px 8px rgba(0,0,0,0.1)';
    
    // 为每个分段创建预览卡片
    for (let i = 0; i < numberOfCards; i++) {
        // 计算此卡片的基本分割范围
        let baseStartY = breakPoints[i];
        let baseEndY = breakPoints[i + 1];
        
        // 应用位置修正
        baseStartY += (i > 0) ? positionCorrection : 0;
        baseEndY += (i < numberOfCards - 1) ? positionCorrection : 0;
        
        // 扩展视觉区域
        let visualStartY = i > 0 ? Math.max(0, baseStartY - visualExtension) : baseStartY;
        let visualEndY = Math.min(originalCardHeight, baseEndY + visualExtension);
        
        // 计算扩展内容范围，确保内容不丢失
        let contentStartY = Math.max(0, visualStartY - (i > 0 ? contentOverlap : 0));
        let contentEndY = Math.min(originalCardHeight, visualEndY + (i < numberOfCards - 1 ? contentOverlap : 0));
        
        const visualHeight = visualEndY - visualStartY;
        
        // 创建预览卡片容器 - 彻底解决底部空间问题
        const previewCardDiv = document.createElement('div');
        previewCardDiv.className = 'split-card-preview';
        previewCardDiv.style.marginBottom = '15px';
        previewCardDiv.style.padding = '10px 10px 0 10px'; // 移除底部padding
        previewCardDiv.style.backgroundColor = 'white';
        previewCardDiv.style.borderRadius = '8px';
        previewCardDiv.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)';
        previewCardDiv.style.position = 'relative';
        previewCardDiv.style.overflow = 'hidden';
        previewCardDiv.style.boxSizing = 'border-box'; // 确保padding不增加元素尺寸
        
        // 创建卡片序号标签
        const cardNumber = document.createElement('div');
        cardNumber.textContent = `Card ${i + 1}/${numberOfCards}`;
        cardNumber.style.backgroundColor = 'rgba(33, 150, 243, 0.8)';
        cardNumber.style.color = 'white';
        cardNumber.style.padding = '4px 10px';
        cardNumber.style.borderRadius = '4px';
        cardNumber.style.fontSize = '12px';
        cardNumber.style.position = 'absolute';
        cardNumber.style.top = '15px';
        cardNumber.style.right = '15px';
        cardNumber.style.zIndex = '10';
        
        previewCardDiv.appendChild(cardNumber);
        
        // 创建一个新的卡片容器 - 调整底部边距
        const newCard = document.createElement('div');
        newCard.className = 'preview-card minimalist';
        newCard.style.transform = 'scale(0.8)';
        newCard.style.transformOrigin = 'top center';
        newCard.style.position = 'relative';
        newCard.style.backgroundColor = cardBackgroundColor;
        newCard.style.borderRadius = cardBorderRadius;
        newCard.style.border = cardBorder;
        newCard.style.boxShadow = cardBoxShadow;
        newCard.style.overflow = 'hidden';
        newCard.style.marginBottom = '0'; // 确保没有底部margin
        
        // 添加卡片标题（从原卡片复制）
        const titleElement = document.createElement('div');
        titleElement.className = 'card-title';
        if (cardTitle) {
            titleElement.innerHTML = cardTitle.innerHTML;
        } else {
            titleElement.textContent = 'Card Title';
        }
        newCard.appendChild(titleElement);
        
        // 添加卡片内容容器
        const contentElement = document.createElement('div');
        contentElement.className = 'card-content';
        contentElement.style.position = 'relative';
        contentElement.style.height = `${visualHeight}px`;
        contentElement.style.overflow = 'hidden';
        contentElement.style.marginBottom = '0'; // 确保没有底部margin
        
        // 如果存在原始内容，复制并调整位置
        const originalContent = originalCardElement.querySelector('.card-content');
        if (originalContent) {
            // 克隆原始内容
            const contentClone = originalContent.cloneNode(true);
            
            // 调整内容位置，考虑内容区域的顶部偏移
            const adjustedTop = contentStartY - contentAreaTopOffset;
            contentClone.style.position = 'absolute';
            contentClone.style.top = `-${adjustedTop}px`;
            contentClone.style.width = '100%';
            
            // 将内容添加到卡片
            contentElement.appendChild(contentClone);
            
            // 仅对底部应用效果，保持顶部完整显示
            if (i < numberOfCards - 1 && contentEndY > baseEndY) {
                // 底部半透明遮罩
                const bottomMask = document.createElement('div');
                bottomMask.style.position = 'absolute';
                bottomMask.style.top = `${baseEndY - contentStartY}px`;
                bottomMask.style.left = '0';
                bottomMask.style.width = '100%';
                bottomMask.style.height = `${contentEndY - baseEndY}px`;
                bottomMask.style.background = 'linear-gradient(to top, rgba(255,255,255,0.9), rgba(255,255,255,0.3))';
                bottomMask.style.pointerEvents = 'none';
                bottomMask.style.zIndex = '2';
                contentElement.appendChild(bottomMask);
                
                // 分割线已移除
                
                // 底部连续性指示器
                const continueIndicator = document.createElement('div');
                continueIndicator.textContent = '... (continues)';
                continueIndicator.style.fontSize = '12px';
                continueIndicator.style.fontStyle = 'italic';
                continueIndicator.style.color = '#666';
                continueIndicator.style.position = 'absolute';
                continueIndicator.style.top = `${baseEndY - contentStartY - 22}px`;
                continueIndicator.style.left = '0';
                continueIndicator.style.width = '100%';
                continueIndicator.style.padding = '2px 5px';
                continueIndicator.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
                continueIndicator.style.zIndex = '3';
                contentElement.appendChild(continueIndicator);
            }
        }
        
        newCard.appendChild(contentElement);
        
        // 添加水印（从原卡片复制）- 调整水印位置
        const watermarkElement = document.createElement('div');
        watermarkElement.className = 'card-watermark';
        if (cardWatermark) {
            watermarkElement.innerHTML = cardWatermark.innerHTML;
        } else {
            watermarkElement.textContent = 'Watermark';
        }
        // 确保水印不占用过多空间
        watermarkElement.style.marginBottom = '0';
        watermarkElement.style.paddingBottom = '5px';
        newCard.appendChild(watermarkElement);
        
        // 将新卡片添加到预览容器
        previewCardDiv.appendChild(newCard);
        
        // 计算和设置预览卡片容器的确切高度 - 使用一次性计时器确保DOM更新
        setTimeout(() => {
            try {
                const actualCardHeight = newCard.offsetHeight;
                // 应用缩放因子
                const scaleFactor = 0.8; // 与卡片使用的缩放系数相同
                const scaledHeight = Math.ceil(actualCardHeight * scaleFactor);
                
                // 设置容器高度为缩放后的高度加上少量额外空间
                previewCardDiv.style.height = `${scaledHeight +30}px`;
                console.log(`Card ${i+1} - 原始高度: ${actualCardHeight}px, 缩放后: ${scaledHeight}px`);
            } catch (e) {
                console.error("Error setting container height:", e);
            }
        }, 0);
        
        // 添加3:4比例最佳高度标记
        const scaledWidth = originalCardWidth * 0.8;
        const optimalHeight = Math.round(scaledWidth * 4/3);
        
        if (optimalHeight < visualHeight) {
            const optimalHeightMarker = document.createElement('div');
            optimalHeightMarker.style.position = 'absolute';
            optimalHeightMarker.style.left = '0';
            optimalHeightMarker.style.width = '100%';
            optimalHeightMarker.style.height = '1px';
            optimalHeightMarker.style.borderTop = '1px dashed rgba(33, 150, 243, 0.5)';
            optimalHeightMarker.style.top = `${optimalHeight}px`;
            optimalHeightMarker.style.zIndex = '5';
            
            const markerLabel = document.createElement('div');
            markerLabel.textContent = '3:4 比例';
            markerLabel.style.position = 'absolute';
            markerLabel.style.right = '10px';
            markerLabel.style.top = `${optimalHeight - 20}px`;
            markerLabel.style.backgroundColor = 'rgba(33, 150, 243, 0.8)';
            markerLabel.style.color = 'white';
            markerLabel.style.padding = '2px 6px';
            markerLabel.style.fontSize = '10px';
            markerLabel.style.borderRadius = '3px';
            markerLabel.style.zIndex = '6';
            
            previewCardDiv.appendChild(optimalHeightMarker);
            previewCardDiv.appendChild(markerLabel);
        }
        
        splitCardsContainer.appendChild(previewCardDiv);
    }
    
    // 恢复滚动位置
    setTimeout(() => {
        splitCardsContainer.scrollTop = currentScrollTop;
    }, 10);
}

// 计算初始分割点
function calculateInitialSplitPoints() {
    console.log("Calculating split points with updated parameters");
    
    // 清空现有分割点
    splitPoints = [];
    
    const originalCard = originalCardWrapper.firstChild;
    if (!originalCard) {
        console.error("Original card not found");
        return;
    }
    
    const cardHeight = originalCard.offsetHeight;
    console.log("Card height:", cardHeight);
    
    // 尝试从会话存储恢复分割点
    const cardId = document.getElementById('card-title').textContent.trim();
    const sessionKey = `splitPoints_${cardId}`;
    const savedPoints = sessionStorage.getItem(sessionKey);
    
    if (savedPoints) {
        try {
            // 尝试恢复保存的分割点
            const parsedPoints = JSON.parse(savedPoints);
            
            // 验证恢复的分割点是否有效
            if (Array.isArray(parsedPoints) && parsedPoints.length > 0 && 
                parsedPoints.every(point => point > 0 && point < cardHeight)) {
                splitPoints = parsedPoints;
                console.log("Restored saved split points:", splitPoints);
                return;
            }
        } catch (e) {
            console.error("Error restoring saved split points:", e);
        }
    }
    
    // 如果没有有效的保存点，则计算新的分割点
    // 第一个分割点从560px开始 (已修改，原为646px)
    let currentPoint = 560;
    
    // 如果卡片高度足够分割
    if (currentPoint < cardHeight - 100) {
        splitPoints.push(currentPoint);
        console.log("Added first split point at:", currentPoint);
        
        // 后续分割点，每隔486px (已修改，原为586px)
        currentPoint += 486;
        
        // 添加后续分割点，直到接近卡片底部
        while (currentPoint < cardHeight - 100) {
            splitPoints.push(currentPoint);
            console.log("Added additional split point at:", currentPoint);
            currentPoint += 486; // 使用新的间隔
        }
    } else {
        console.log("Card too short to split");
    }
    
    console.log("Final split points:", splitPoints);
}

// 渲染分割线
function renderSplitLines() {
    console.log("Rendering split lines");
    
    // 清除现有分割线
    const existingLines = originalCardWrapper.querySelectorAll('.split-line');
    existingLines.forEach(line => line.remove());
    
    // 为每个分割点添加分割线
    splitPoints.forEach((point, index) => {
        console.log(`Rendering split line ${index+1} at ${point}px`);
        
        const splitLine = document.createElement('div');
        splitLine.className = 'split-line';
        splitLine.style.top = `${point}px`;
        splitLine.style.position = 'absolute';
        splitLine.style.left = '0';
        splitLine.style.width = '100%';
        splitLine.style.height = '0';
        splitLine.style.borderTop = '2px dashed #292929';
        splitLine.style.zIndex = '100';
        splitLine.style.cursor = 'row-resize';
        
        // 添加拖动事件
        splitLine.addEventListener('mousedown', handleDragStart(index));
        
        originalCardWrapper.appendChild(splitLine);
    });
}

// 分割线拖动处理
function handleDragStart(index) {
    return function(e) {
        e.preventDefault();
        
        const startY = e.clientY;
        const initialTop = splitPoints[index];
        
        // 记录滚动位置
        const scrollTop = splitCardsContainer.scrollTop;
        
        function handleMouseMove(moveEvent) {
            const deltaY = moveEvent.clientY - startY;
            const newPosition = initialTop + deltaY;
            
            // 确保分割点不会超出边界和重叠
            if (index > 0 && newPosition <= splitPoints[index - 1] + 50) {
                return;
            }
            
            if (index < splitPoints.length - 1 && newPosition >= splitPoints[index + 1] - 50) {
                return;
            }
            
            // 更新分割点位置
            splitPoints[index] = newPosition;
            
            // 更新分割线位置
            const splitLine = originalCardWrapper.querySelectorAll('.split-line')[index];
            if (splitLine) {
                splitLine.style.top = `${newPosition}px`;
            }
        }
        
        function handleMouseUp() {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            
            // 更新拆分预览，保存当前滚动位置
            window.scrollTopBeforeUpdate = splitCardsContainer.scrollTop;
            generateSplitPreviews();
            
            // 恢复滚动位置
            setTimeout(() => {
                splitCardsContainer.scrollTop = window.scrollTopBeforeUpdate || scrollTop;
            }, 20);
        }
        
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };
}

// 更新模态框底部按钮 - 添加保存按钮
function updateModalButtons() {
    const modalFooter = document.querySelector('.split-modal-footer');
    if (modalFooter) {
        modalFooter.innerHTML = '';
        
        // 添加取消按钮
        const cancelBtn = document.createElement('button');
        cancelBtn.id = 'split-cancel-btn';
        cancelBtn.className = 'btn';
        cancelBtn.textContent = 'Cancel';
        cancelBtn.addEventListener('click', closeSplitModal);
        
        // 添加保存按钮
        const saveBtn = document.createElement('button');
        saveBtn.id = 'split-save-btn';
        saveBtn.className = 'btn action-btn';
        saveBtn.innerHTML = '<i class="fas fa-save"></i> Save';
        saveBtn.addEventListener('click', saveSplitSettings);
        
        // 添加下载全部按钮
        const downloadAllBtn = document.createElement('button');
        downloadAllBtn.id = 'split-download-all-btn';
        downloadAllBtn.className = 'btn primary-btn';
        downloadAllBtn.innerHTML = '<i class="fas fa-download"></i> Download All';
        downloadAllBtn.addEventListener('click', downloadAllCards);
        
        // 将按钮添加到底部栏
        modalFooter.appendChild(cancelBtn);
        modalFooter.appendChild(saveBtn);
        modalFooter.appendChild(downloadAllBtn);
    }
}

// 下载所有拆分卡片 - 修复内容截断问题
function downloadAllCards() {
    console.log('Downloading all split cards');
    
    // 首先检查html2canvas是否可用
    if (typeof html2canvas !== 'function') {
        console.error('html2canvas库未加载！');
        alert('下载功能需要html2canvas库，请确保它已正确加载。');
        return;
    }
    
    // 获取所有预览卡片
    const previewCards = document.querySelectorAll('.split-card-preview');
    if (!previewCards.length) {
        alert('没有可下载的卡片！');
        return;
    }
    
    // 显示下载进度提示
    const downloadStatus = document.createElement('div');
    downloadStatus.className = 'download-status';
    downloadStatus.textContent = `准备下载 ${previewCards.length} 张卡片...`;
    downloadStatus.style.position = 'fixed';
    downloadStatus.style.bottom = '20px';
    downloadStatus.style.right = '20px';
    downloadStatus.style.padding = '10px 15px';
    downloadStatus.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    downloadStatus.style.color = 'white';
    downloadStatus.style.borderRadius = '5px';
    downloadStatus.style.zIndex = '9999';
    document.body.appendChild(downloadStatus);
    
    // 获取原始卡片
    const originalCard = document.getElementById('preview-card');
    if (!originalCard) {
        console.error('找不到原始卡片！');
        alert('找不到原始卡片！');
        document.body.removeChild(downloadStatus);
        return;
    }
    
    // 获取原始卡片宽度和当前样式
    const cardWidth = originalCard.offsetWidth;
    console.log('原始卡片宽度:', cardWidth);
    const cardStyle = originalCard.className.split(' ').find(cls => 
        ['minimalist', 'holographic', 'neopop', 'darktech', 'cyberpunk', 'vaporwave'].includes(cls)
    ) || 'minimalist';
    
    // 获取卡片标题作为文件名前缀
    const cardTitle = originalCard.querySelector('.card-title');
    const fileNamePrefix = cardTitle ? 
        cardTitle.textContent.trim().replace(/[^\w\s]/gi, '').replace(/\s+/g, '_').substring(0, 20) : 
        'card';
    
    // 创建临时容器用于渲染完整尺寸的卡片
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '0';
    tempContainer.style.width = `${cardWidth}px`; 
    tempContainer.style.padding = '20px';
    tempContainer.style.backgroundColor = 'white';
    tempContainer.style.zIndex = '-1'; // 确保在背景中
    document.body.appendChild(tempContainer);
    
    // 递归处理每张卡片，确保按顺序下载
    function processNextCard(index) {
        if (index >= previewCards.length) {
            // 所有卡片处理完毕
            document.body.removeChild(tempContainer);
            document.body.removeChild(downloadStatus);
            alert('所有卡片下载完成！');
            closeSplitModal();
            return;
        }
        
        try {
            // 更新状态
            downloadStatus.textContent = `正在处理卡片 ${index + 1}/${previewCards.length}...`;
            console.log(`处理卡片 ${index + 1}/${previewCards.length}`);
            
            // 获取预览卡片的尺寸和位置信息
            const previewCardDiv = previewCards[index];
            const previewCardElement = previewCardDiv.querySelector('.preview-card');
            if (!previewCardElement) {
                console.error("预览卡片元素未找到");
                processNextCard(index + 1);
                return;
            }
            
            // 获取卡片内容区域
            const previewContentElement = previewCardElement.querySelector('.card-content');
            if (!previewContentElement) {
                console.error("预览卡片内容区域未找到");
                processNextCard(index + 1);
                return;
            }
            
            // 获取内容区域的尺寸
            const contentHeight = previewContentElement.offsetHeight;
            
            // 创建用于下载的卡片副本
            const downloadCard = previewCardElement.cloneNode(true);
            
            // 移除缩放但保留其他样式
            downloadCard.style.transform = 'none';
            downloadCard.style.width = `${cardWidth}px`;
            downloadCard.style.maxWidth = `${cardWidth}px`;
            downloadCard.style.margin = '0 auto';
            downloadCard.style.overflow = 'hidden'; // 确保内容不溢出
            
            // 清空临时容器并添加卡片
            tempContainer.innerHTML = '';
            tempContainer.appendChild(downloadCard);
            
            // 关键修复：调整内容区域，保持固定高度并隐藏溢出
            const contentElement = downloadCard.querySelector('.card-content');
            if (contentElement) {
                // 保持固定高度，不要设为auto
                contentElement.style.height = `${contentHeight}px`;
                contentElement.style.overflow = 'hidden'; // 关键：隐藏溢出内容
                
                // 重要：保留原始绝对定位，不要修改为相对定位
                const innerContent = contentElement.querySelector('div');
                if (innerContent) {
                    // 保持原始absolute定位，不要修改为relative
                    innerContent.style.position = 'absolute'; // 确保是absolute
                    
                    // 隐藏分割线
                    const bottomLine = contentElement.querySelector('div[style*="dashed"]');
                    if (bottomLine) {
                        bottomLine.style.display = 'none';
                    }
                    
                    // 确保遮罩和continues指示器正常显示
                    const continuesIndicator = contentElement.querySelector('div[style*="continues"]');
                    if (continuesIndicator) {
                        continuesIndicator.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                        continuesIndicator.style.fontWeight = 'bold';
                        continuesIndicator.style.padding = '4px 8px';
                        continuesIndicator.style.display = 'block'; // 确保显示
                    }
                    
                    const bottomMask = contentElement.querySelector('div[style*="linear-gradient"]');
                    if (bottomMask) {
                        bottomMask.style.background = 'linear-gradient(to top, rgba(255,255,255,0.95), rgba(255,255,255,0.4))';
                        bottomMask.style.display = 'block'; // 确保显示
                    }
                    
                    // 确保所有子元素都在可见区域内
                    const children = contentElement.querySelectorAll('*');
                    children.forEach(child => {
                        if (child.style.top) {
                            // 如果元素有top定位，确保它不超出内容区域高度
                            const topValue = parseFloat(child.style.top);
                            if (topValue > contentHeight) {
                                child.style.display = 'none'; // 隐藏超出内容区域的元素
                            }
                        }
                    });
                }
                
                // 添加底部填充，确保卡片看起来完整
                const cardFooter = downloadCard.querySelector('div:last-child');
                if (cardFooter && cardFooter.style.height) {
                    // 确保底部留白显示
                    cardFooter.style.marginTop = '10px';
                }
            }
            
            console.log('准备使用html2canvas捕获卡片', index + 1);
            
            // 使用简化的html2canvas配置
            html2canvas(downloadCard, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: null,
                logging: true,
                imageTimeout: 0,
                onclone: function(clonedDoc) {
                    // 克隆文档后，最后一次确保溢出内容被隐藏
                    const clonedCard = clonedDoc.querySelector('.preview-card');
                    if (clonedCard) {
                        const clonedContent = clonedCard.querySelector('.card-content');
                        if (clonedContent) {
                            clonedContent.style.overflow = 'hidden';
                            clonedContent.style.height = `${contentHeight}px`;
                        }
                    }
                }
            }).then(canvas => {
                console.log(`卡片 ${index + 1} 成功生成canvas`);
                
                try {
                    // 转换为图片并下载
                    const imgData = canvas.toDataURL('image/png');
                    const link = document.createElement('a');
                    link.href = imgData;
                    link.download = `${fileNamePrefix}_part${index + 1}.png`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    console.log(`卡片 ${index + 1} 下载链接已创建`);
                    
                    // 处理下一张卡片
                    setTimeout(() => {
                        processNextCard(index + 1);
                    }, 500);
                } catch (err) {
                    console.error('下载图片时出错:', err);
                    alert(`下载卡片 ${index + 1} 时出错: ${err.message}`);
                    processNextCard(index + 1);
                }
            }).catch(error => {
                console.error('生成卡片图片时出错:', error);
                alert(`生成卡片 ${index + 1} 图片时出错: ${error.message}`);
                processNextCard(index + 1);
            });
        } catch (err) {
            console.error('处理卡片时发生错误:', err);
            alert(`处理卡片 ${index + 1} 时发生错误: ${err.message}`);
            processNextCard(index + 1);
        }
    }
    
    // 开始处理第一张卡片
    setTimeout(() => {
        processNextCard(0);
    }, 100);
}

// 保存拆分设置
function saveSplitSettings() {
    if (splitPoints.length > 0) {
        const cardId = document.getElementById('card-title').textContent.trim();
        const sessionKey = `splitPoints_${cardId}`;
        sessionStorage.setItem(sessionKey, JSON.stringify(splitPoints));
        
        // 显示保存成功提示
        const savedTip = document.createElement('div');
        savedTip.textContent = '拆分设置已保存';
        savedTip.style.position = 'fixed';
        savedTip.style.bottom = '20px';
        savedTip.style.right = '20px';
        savedTip.style.padding = '10px 15px';
        savedTip.style.backgroundColor = 'rgba(76, 175, 80, 0.9)';
        savedTip.style.color = 'white';
        savedTip.style.borderRadius = '5px';
        savedTip.style.zIndex = '9999';
        document.body.appendChild(savedTip);
        
        setTimeout(() => {
            document.body.removeChild(savedTip);
        }, 2000);
    }
}

// 在页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSplitCardFeature);
} else {
    // 如果DOM已经加载完成，立即执行初始化
    initSplitCardFeature();
}