        // 更新style tabs的click事件监听器
        styleTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                styleTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Update card style
                const style = tab.getAttribute('data-style');
                previewCard.className = 'preview-card ' + style;
                
                // 确保特殊元素正确显示
                ensureSpecialElements();
				
				// 更新预览内容
                cardContent.innerHTML = editor.innerHTML;
            });
        });
		
		// 添加一个格式化时间的辅助函数
        function formatTime(date) {
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        }