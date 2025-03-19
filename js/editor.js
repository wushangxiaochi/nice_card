// 文本格式化按钮事件监听器
        boldBtn.addEventListener('click', () => {
            editor.focus();
            applyFormattingCommand('bold');
        });

        italicBtn.addEventListener('click', () => {
            editor.focus();
            applyFormattingCommand('italic');
        });

        underlineBtn.addEventListener('click', () => {
            editor.focus();
            applyFormattingCommand('underline');
        });

        // 字体大小选择器
        fontSizeSelect.addEventListener('change', () => {
            editor.focus();
            applyFontSize(fontSizeSelect.value);
        });

        // 文本颜色选择器 - 增加点击事件
        textColor.addEventListener('click', (e) => {
            // 如果是input元素的正常点击，不执行额外操作(让浏览器正常打开颜色选择器)
            // 但如果点击事件被阻止默认行为，则表示这是复用颜色的点击操作
            if (e.target === textColor && e.defaultPrevented) {
                return;
            }
            
            // 获取选中的文本并应用当前颜色
            editor.focus();
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                if (!range.collapsed) {
                    applyTextColor(textColor.value);
                    // 防止颜色选择器对话框打开
                    e.preventDefault();
                }
            }
        });

        // 背景颜色选择器 - 增加点击事件
        bgColor.addEventListener('click', (e) => {
            // 同样的逻辑判断
            if (e.target === bgColor && e.defaultPrevented) {
                return;
            }
            
            // 获取选中的文本并应用当前背景色
            editor.focus();
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                if (!range.collapsed) {
                    applyBackgroundColor(bgColor.value);
                    // 防止颜色选择器对话框打开
                    e.preventDefault();
                }
            }
        });

        // 文本对齐按钮
        alignLeft.addEventListener('click', () => {
            editor.focus();
            applyAlignment('left');
        });

        alignCenter.addEventListener('click', () => {
            editor.focus();
            applyAlignment('center');
        });

        alignRight.addEventListener('click', () => {
            editor.focus();
            applyAlignment('right');
        });

        // 添加选择状态更新，使按钮状态与当前格式保持同步
        editor.addEventListener('mouseup', updateToolbarState);
        editor.addEventListener('keyup', updateToolbarState);

        // 更新工具栏状态函数
        function updateToolbarState() {
            boldBtn.classList.toggle('active', isFormatActive('bold'));
            italicBtn.classList.toggle('active', isFormatActive('italic'));
            underlineBtn.classList.toggle('active', isFormatActive('underline'));
            alignLeft.classList.toggle('active', isAlignmentActive('left'));
            alignCenter.classList.toggle('active', isAlignmentActive('center'));
            alignRight.classList.toggle('active', isAlignmentActive('right'));
        }
		
		// 在elements部分添加新按钮变量
        const clearFormatBtn = document.getElementById('clear-format-btn');
		
		// 在现有的格式化按钮事件监听器部分添加清除格式功能
        clearFormatBtn.addEventListener('click', () => {
            editor.focus();
            
            const selection = window.getSelection();
            if (!selection.rangeCount) return;
            
            // 保存选中内容的纯文本值
            const selectedText = selection.getRangeAt(0).toString();
            
            // 如果有选中的文本
            if (selectedText.trim().length > 0) {
                clearFormatting();
                
                // 获取当前卡片样式
                const currentStyle = previewCard.className.replace('preview-card', '').trim();
                
                // 获取默认颜色
                let defaultColor, defaultBgColor;
                
                switch(currentStyle) {
                    case 'minimalist':
                        defaultColor = '#292929';
                        defaultBgColor = 'transparent';
                        break;
                    case 'holographic':
                        defaultColor = '#292929';
                        defaultBgColor = 'transparent';
                        break;
                    case 'neopop':
                        defaultColor = '#292929';
                        defaultBgColor = '#FBD348';
                        break;
                    case 'darktech':
                        defaultColor = '#ffffff';
                        defaultBgColor = 'rgba(10, 10, 10, 0.8)';
                        break;
                    case 'cyberpunk':
                        defaultColor = '#00fffc';
                        defaultBgColor = 'rgba(10, 10, 43, 0.7)';
                        break;
                    case 'vaporwave':
                        defaultColor = '#fff';
                        defaultBgColor = 'transparent';
                        break;
                    default:
                        defaultColor = '#292929';
                        defaultBgColor = 'transparent';
                }
                
                // 应用默认样式到纯文本
                if (selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0);
                    if (!range.collapsed) {
                        // 提取内容
                        const content = range.extractContents();
                        
                        // 创建包装元素并应用样式
                        const wrapper = document.createElement('span');
                        wrapper.style.color = defaultColor;
                        wrapper.style.backgroundColor = defaultBgColor;
                        
                        // 添加内容到包装元素
                        wrapper.appendChild(content);
                        
                        // 插入到原位置
                        range.insertNode(wrapper);
                        
                        // 选中新插入的内容
                        selection.removeAllRanges();
                        const newRange = document.createRange();
                        newRange.selectNodeContents(wrapper);
                        selection.addRange(newRange);
                    }
                }
            }
            
            // 更新预览
            cardContent.innerHTML = editor.innerHTML;
            
            // 更新工具栏状态
            updateToolbarState();
        });
		
		    // Format painter functionality
        let formatData = null;
        let formatPainterActive = false;

        formatPainter.addEventListener('click', () => {
            const selection = window.getSelection();
            
            if (selection.rangeCount > 0 && !formatPainterActive) {
                // Copy format
                const range = selection.getRangeAt(0);
                if (!range.collapsed) {
                    const selectedNode = range.commonAncestorContainer;
                    
                    // Get the parent element if we're in a text node
                    const selectedElement = selectedNode.nodeType === 3 ? selectedNode.parentNode : selectedNode;
                    
                    // Store format data
                    formatData = {
                        fontWeight: getComputedStyle(selectedElement).fontWeight,
                        fontStyle: getComputedStyle(selectedElement).fontStyle,
                        textDecoration: getComputedStyle(selectedElement).textDecoration,
                        fontSize: getComputedStyle(selectedElement).fontSize,
                        color: getComputedStyle(selectedElement).color,
                        backgroundColor: getComputedStyle(selectedElement).backgroundColor,
                        textAlign: getComputedStyle(selectedElement).textAlign,
                        html: selectedElement.outerHTML
                    };
                    
                    // Activate format painter
                    formatPainterActive = true;
                    formatPainter.classList.add('active');
                    formatPainter.querySelector('i').classList.remove('fa-paint-brush');
                    formatPainter.querySelector('i').classList.add('fa-check');
                } else {
                    alert('Please select some text to copy its format');
                }
            } else if (formatPainterActive) {
                // Cancel format painter
                formatPainterActive = false;
                formatPainter.classList.remove('active');
                formatPainter.querySelector('i').classList.remove('fa-check');
                formatPainter.querySelector('i').classList.add('fa-paint-brush');
            }
        });

        // Apply format when text is selected while format painter is active
        editor.addEventListener('mouseup', () => {
            if (formatPainterActive) {
                const selection = window.getSelection();
                
                if (selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0);
                    
                    if (!range.collapsed) {
                        // Apply format to selected text
                        const selectedContent = range.extractContents();
                        const span = document.createElement('span');
                        
                        // Apply stored styles
                        span.style.fontWeight = formatData.fontWeight;
                        span.style.fontStyle = formatData.fontStyle;
                        span.style.textDecoration = formatData.textDecoration;
                        span.style.fontSize = formatData.fontSize;
                        span.style.color = formatData.color;
                        
                        if (formatData.backgroundColor !== 'rgba(0, 0, 0, 0)' && 
                            formatData.backgroundColor !== 'transparent') {
                            span.style.backgroundColor = formatData.backgroundColor;
                        }
                        
                        span.style.textAlign = formatData.textAlign;
                        
                        span.appendChild(selectedContent);
                        range.insertNode(span);
                        
                        // Deactivate format painter after one use
                        formatPainterActive = false;
                        formatPainter.classList.remove('active');
                        formatPainter.querySelector('i').classList.remove('fa-check');
                        formatPainter.querySelector('i').classList.add('fa-paint-brush');
                        
                        // Update preview
                        const inputEvent = new Event('input', {
                            bubbles: true,
                            cancelable: true,
                        });
                        editor.dispatchEvent(inputEvent);
                    }
                }
            }
        });

        // 图片上传事件监听器
        imageUpload.addEventListener('change', function(e) {
            // 保存当前选区
            const selection = window.getSelection();
            const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
            
            const file = this.files[0];
            if (!file) return;
            
            // 在读取文件前，标记光标的当前位置
            const markerID = 'img-insertion-point-' + Date.now();
            const marker = document.createElement('span');
            marker.id = markerID;
            marker.style.display = 'inline';
            marker.style.width = '0px';
            marker.style.height = '0px';
            
            // 插入标记到当前光标位置
            if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                if (editor.contains(range.commonAncestorContainer) || editor === range.commonAncestorContainer) {
                    range.insertNode(marker);
                } else {
                    editor.appendChild(marker);
                }
            } else {
                editor.appendChild(marker);
            }
            
            const reader = new FileReader();
            reader.onload = function(e) {
                const insertionPoint = document.getElementById(markerID);
                if (!insertionPoint) {
                    console.warn('Could not find insertion point marker, appending to end');
                    insertImage(e.target.result, editor);
                    return;
                }
                
                // 创建和插入图片
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.maxWidth = '100%';
                img.style.height = 'auto';
                img.style.display = 'block';
                img.style.margin = '10px auto';
                
                // 在标记前插入换行
                const brBefore = document.createElement('br');
                insertionPoint.parentNode.insertBefore(brBefore, insertionPoint);
                
                // 在标记处插入图片
                insertionPoint.parentNode.insertBefore(img, insertionPoint);
                
                // 在标记后插入换行
                const brAfter = document.createElement('br');
                insertionPoint.parentNode.insertBefore(brAfter, insertionPoint);
                
                // 移除标记
                insertionPoint.parentNode.removeChild(insertionPoint);
                
                // 更新预览
                cardContent.innerHTML = editor.innerHTML;
                
                // 触发编辑器内容更改事件
                editor.dispatchEvent(new Event('input', {
                    bubbles: true,
                    cancelable: true,
                }));
            };
            
            reader.readAsDataURL(file);
            
            // 重置文件输入以允许再次选择相同文件
            this.value = '';
        });

        // 用于在末尾添加图片的辅助函数
        function insertImage(imageDataUrl, targetElement) {
            const img = document.createElement('img');
            img.src = imageDataUrl;
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
            img.style.display = 'block';
            img.style.margin = '10px auto';
            
            targetElement.appendChild(document.createElement('br'));
            targetElement.appendChild(img);
            targetElement.appendChild(document.createElement('br'));
            
            // 更新预览
            cardContent.innerHTML = editor.innerHTML;
            
            // 触发编辑器内容更改事件
            editor.dispatchEvent(new Event('input', {
                bubbles: true,
                cancelable: true,
            }));
        }

        // Ensure editor always has focus when clicking on toolbar buttons
        document.querySelectorAll('.toolbar button').forEach(button => {
            button.addEventListener('mousedown', (e) => {
                // Prevent default to avoid losing focus from editor
                e.preventDefault();
            });
        });
		
            // 添加新的现代API实现函数
            
            // 应用文本格式化（粗体、斜体、下划线）
            function applyFormattingCommand(format) {
                const selection = window.getSelection();
                if (!selection.rangeCount) return;
                
                const range = selection.getRangeAt(0);
                if (range.collapsed) return; // 没有选中任何文本
                
                // 创建适当的包装元素
                let wrapElement;
                switch(format) {
                    case 'bold':
                        wrapElement = document.createElement('strong');
                        break;
                    case 'italic':
                        wrapElement = document.createElement('em');
                        break;
                    case 'underline':
                        wrapElement = document.createElement('u');
                        break;
                    default:
                        return;
                }
                
                // 如果已经应用了相同的格式，我们需要删除它
                if (isFormatActive(format)) {
                    removeFormat(format);
                    return;
                }
                
                // 提取选中内容并包装在格式化元素中
                const fragment = range.extractContents();
                wrapElement.appendChild(fragment);
                range.insertNode(wrapElement);
                
                // 重置选择范围到包装后的整个内容
                selection.removeAllRanges();
                const newRange = document.createRange();
                newRange.selectNodeContents(wrapElement);
                selection.addRange(newRange);
                
                // 触发内容更改事件
                const inputEvent = new Event('input', { bubbles: true, cancelable: true });
                editor.dispatchEvent(inputEvent);
            }
            
            // 应用字体大小
            function applyFontSize(size) {
                const selection = window.getSelection();
                if (!selection.rangeCount) return;
                
                const range = selection.getRangeAt(0);
                if (range.collapsed) return;
                
                const span = document.createElement('span');
                span.style.fontSize = size === '1' ? '10px' : 
                                 size === '2' ? '13px' : 
                                 size === '3' ? '16px' : 
                                 size === '4' ? '18px' : 
                                 size === '5' ? '24px' : 
                                 size === '6' ? '32px' : 
                                 size === '7' ? '48px' : '16px';
                
                const fragment = range.extractContents();
                span.appendChild(fragment);
                range.insertNode(span);
                
                // 重置选择范围
                selection.removeAllRanges();
                const newRange = document.createRange();
                newRange.selectNodeContents(span);
                selection.addRange(newRange);
                
                // 触发内容更改事件
                const inputEvent = new Event('input', { bubbles: true, cancelable: true });
                editor.dispatchEvent(inputEvent);
            }
            
            // 应用文本颜色
            function applyTextColor(color) {
                const selection = window.getSelection();
                if (!selection.rangeCount) return;
                
                const range = selection.getRangeAt(0);
                if (range.collapsed) return;
                
                const span = document.createElement('span');
                span.style.color = color;
                
                const fragment = range.extractContents();
                span.appendChild(fragment);
                range.insertNode(span);
                
                // 重置选择范围
                selection.removeAllRanges();
                const newRange = document.createRange();
                newRange.selectNodeContents(span);
                selection.addRange(newRange);
                
                // 触发内容更改事件
                const inputEvent = new Event('input', { bubbles: true, cancelable: true });
                editor.dispatchEvent(inputEvent);
            }
            
            // 应用背景颜色
            function applyBackgroundColor(color) {
                const selection = window.getSelection();
                if (!selection.rangeCount) return;
                
                const range = selection.getRangeAt(0);
                if (range.collapsed) return;
                
                const span = document.createElement('span');
                span.style.backgroundColor = color;
                
                const fragment = range.extractContents();
                span.appendChild(fragment);
                range.insertNode(span);
                
                // 重置选择范围
                selection.removeAllRanges();
                const newRange = document.createRange();
                newRange.selectNodeContents(span);
                selection.addRange(newRange);
                
                // 触发内容更改事件
                const inputEvent = new Event('input', { bubbles: true, cancelable: true });
                editor.dispatchEvent(inputEvent);
            }
            
            // 应用文本对齐
            function applyAlignment(alignment) {
                const selection = window.getSelection();
                if (!selection.rangeCount) return;
                
                const range = selection.getRangeAt(0);
                
                // 查找包含选区的段落元素
                let container = range.commonAncestorContainer;
                while (container !== editor && container.nodeName !== 'P' && container.nodeName !== 'DIV') {
                    container = container.parentNode;
                }
                
                // 如果没有找到段落元素或者找到的是编辑器本身，创建一个新的段落
                if (container === editor) {
                    const p = document.createElement('p');
                    
                    // 将选区内容放入新段落
                    const fragment = range.extractContents();
                    p.appendChild(fragment);
                    range.insertNode(p);
                    container = p;
                }
                
                // 设置对齐方式
                container.style.textAlign = alignment;
                
                // 触发内容更改事件
                const inputEvent = new Event('input', { bubbles: true, cancelable: true });
                editor.dispatchEvent(inputEvent);
            }
            
            // 检查当前选区是否应用了特定格式
            function isFormatActive(format) {
                const selection = window.getSelection();
                if (!selection.rangeCount) return false;
                
                const range = selection.getRangeAt(0);
                let container = range.commonAncestorContainer;
                
                // 如果是文本节点，取其父节点
                if (container.nodeType === Node.TEXT_NODE) {
                    container = container.parentNode;
                }
                
                // 向上遍历DOM树，检查是否有相应的格式元素
                while (container !== editor) {
                    if (format === 'bold' && (container.nodeName === 'STRONG' || container.nodeName === 'B')) {
                        return true;
                    }
                    if (format === 'italic' && (container.nodeName === 'EM' || container.nodeName === 'I')) {
                        return true;
                    }
                    if (format === 'underline' && container.nodeName === 'U') {
                        return true;
                    }
                    
                    container = container.parentNode;
                    if (!container) break;
                }
                
                return false;
            }
            
            // 检查当前选区是否应用了特定对齐方式
            function isAlignmentActive(alignment) {
                const selection = window.getSelection();
                if (!selection.rangeCount) return false;
                
                const range = selection.getRangeAt(0);
                let container = range.commonAncestorContainer;
                
                // 如果是文本节点，取其父节点
                if (container.nodeType === Node.TEXT_NODE) {
                    container = container.parentNode;
                }
                
                // 向上遍历DOM树，查找段落元素并检查其对齐方式
                while (container !== editor) {
                    if (container.nodeName === 'P' || container.nodeName === 'DIV') {
                        const textAlign = getComputedStyle(container).textAlign;
                        return (alignment === 'left' && textAlign === 'left') ||
                               (alignment === 'center' && textAlign === 'center') ||
                               (alignment === 'right' && textAlign === 'right');
                    }
                    
                    container = container.parentNode;
                    if (!container) break;
                }
                
                // 默认是左对齐
                return alignment === 'left';
            }
            
            // 移除特定格式
            function removeFormat(format) {
                const selection = window.getSelection();
                if (!selection.rangeCount) return;
                
                const range = selection.getRangeAt(0);
                let startContainer = range.startContainer;
                let endContainer = range.endContainer;
                
                // 如果是文本节点，取其父节点
                if (startContainer.nodeType === Node.TEXT_NODE) {
                    startContainer = startContainer.parentNode;
                }
                if (endContainer.nodeType === Node.TEXT_NODE) {
                    endContainer = endContainer.parentNode;
                }
                
                // 找到所有有该格式的元素
                const formatElements = [];
                const nodes = editor.querySelectorAll(
                    format === 'bold' ? 'strong, b' : 
                    format === 'italic' ? 'em, i' : 
                    format === 'underline' ? 'u' : ''
                );
                
                // 检查每个格式元素是否在选区范围内
                nodes.forEach(node => {
                    if (range.intersectsNode(node)) {
                        formatElements.push(node);
                    }
                });
                
                // 替换每个格式元素为其内容
                formatElements.forEach(el => {
                    const parent = el.parentNode;
                    while (el.firstChild) {
                        parent.insertBefore(el.firstChild, el);
                    }
                    parent.removeChild(el);
                });
                
                // 触发内容更改事件
                const inputEvent = new Event('input', { bubbles: true, cancelable: true });
                editor.dispatchEvent(inputEvent);
            }
            
            // 彻底重写清除格式函数
            function clearFormatting() {
                const selection = window.getSelection();
                if (!selection.rangeCount) return;
                
                const range = selection.getRangeAt(0);
                if (range.collapsed) return; // 没有选中文本则退出
                
                // 获取当前卡片样式
                const currentStyle = previewCard.className.replace('preview-card', '').trim();
                
                // 先使用execCommand移除所有格式
                document.execCommand('removeFormat', false, null);
                
                // 获取默认颜色
                let defaultColor, defaultBgColor;
                
                switch(currentStyle) {
                    case 'minimalist':
                        defaultColor = '#292929';
                        defaultBgColor = 'transparent';
                        break;
                    case 'holographic':
                        defaultColor = '#292929';
                        defaultBgColor = 'transparent';
                        break;
                    case 'neopop':
                        defaultColor = '#292929';
                        defaultBgColor = 'transparent';
                        break;
                    case 'darktech':
                        defaultColor = '#ffffff';
                        defaultBgColor = 'rgba(10, 10, 10, 0.8)';
                        break;
                    case 'cyberpunk':
                        defaultColor = '#00fffc';
                        defaultBgColor = 'rgba(10, 10, 43, 0.7)';
                        break;
                    case 'vaporwave':
                        defaultColor = '#fff';
                        defaultBgColor = 'transparent';
                        break;
                    default:
                        defaultColor = '#292929';
                        defaultBgColor = 'transparent';
                }
                
                // 应用默认文字颜色
                document.execCommand('foreColor', false, defaultColor);
                
                // 根据需要应用默认背景色
                if (defaultBgColor !== 'transparent') {
                    document.execCommand('hiliteColor', false, defaultBgColor);
                }
                
                // 触发内容更改事件
                const inputEvent = new Event('input', { bubbles: true, cancelable: true });
                editor.dispatchEvent(inputEvent);
            }


