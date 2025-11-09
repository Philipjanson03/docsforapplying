// Interactive Checkboxes for Digital Garden
(function() {
    'use strict';
    
    function getCheckboxId(checkbox) {
        const parent = checkbox.closest('li, p');
        if (!parent) return null;
        const text = parent.textContent.trim().substring(2);
        const hash = text.substring(0, 50).replace(/\s+/g, '-').toLowerCase();
        const page = window.location.pathname;
        return `dg-checkbox-${page}-${hash}`;
    }
    
    function saveCheckboxState(checkboxId, checked) {
        try {
            const states = JSON.parse(localStorage.getItem('dg-checkboxes') || '{}');
            states[checkboxId] = checked;
            localStorage.setItem('dg-checkboxes', JSON.stringify(states));
        } catch (e) {
            console.error('Error saving checkbox state:', e);
        }
    }
    
    function loadCheckboxState(checkboxId) {
        try {
            const states = JSON.parse(localStorage.getItem('dg-checkboxes') || '{}');
            return states[checkboxId] === true;
        } catch (e) {
            return false;
        }
    }
    
    function initializeCheckboxes() {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        
        checkboxes.forEach(checkbox => {
            const checkboxId = getCheckboxId(checkbox);
            if (!checkboxId) return;
            
            const savedState = loadCheckboxState(checkboxId);
            if (savedState !== checkbox.checked) {
                checkbox.checked = savedState;
            }
            
            checkbox.addEventListener('change', function() {
                saveCheckboxState(checkboxId, this.checked);
            });
            
            checkbox.style.cursor = 'pointer';
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeCheckboxes);
    } else {
        initializeCheckboxes();
    }
    
    setTimeout(initializeCheckboxes, 500);
})();
