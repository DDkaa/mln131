// Scroll Animation Observer - Enhanced with repeat animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        } else {
            // Remove class when out of view to enable re-animation
            entry.target.classList.remove('animate-in');
        }
    });
}, observerOptions);

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Animate hero immediately
    const hero = document.querySelector('.hero');
    if (hero) {
        setTimeout(() => {
            hero.classList.add('animate-in');
        }, 100);
    }

    // Observe ALL elements that should animate
    const animatedElements = document.querySelectorAll(`
        .section,
        .section-title,
        .section-title-large,
        .subsection-title,
        .card-title,
        .qa-title,
        .footer-title,
        .content-text,
        .section-description,
        .image-wrapper,
        .flex-image,
        .flex-image img,
        .image-col,
        .card,
        .qa-card,
        .footer-card,
        .content-list,
        .card-list,
        .qa-list,
        .footer-list,
        .flex-content,
        .text-center,
        .image-row,
        .grid-2,
        .subsection,
        .flipbook-container,
        .footer-grid,
        .footer-card,
        .commitment-boxes,
        .info-list,
        .qa-input-group,
        .hero-subtitle,
        .hero-title,
        p,
        ul,
        h3,
        h4
    `);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Animate list items with stagger effect - repeatable
    const lists = document.querySelectorAll('.content-list, .card-list, .qa-list, .footer-list');
    lists.forEach(list => {
        const listObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const items = entry.target.querySelectorAll('li');
                if (entry.isIntersecting) {
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate-in');
                        }, index * 80);
                    });
                } else {
                    // Remove animation when out of view
                    items.forEach(item => {
                        item.classList.remove('animate-in');
                    });
                }
            });
        }, { threshold: 0.1 });
        listObserver.observe(list);
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Chatbot functionality
const chatbotBtn = document.querySelector('.chatbot-btn');
if (chatbotBtn) {
    chatbotBtn.addEventListener('click', () => {
        // Scroll to Q&A section
        const qaSection = document.querySelector('#question-answer');
        if (qaSection) {
            qaSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Focus on input
        setTimeout(() => {
            const input = document.querySelector('#userQuestion');
            if (input) {
                input.focus();
            }
        }, 800);
    });
}

// AI Q&A Functionality
function askAI() {
    const input = document.getElementById('userQuestion');
    const responseDiv = document.getElementById('aiResponse');
    
    if (!input || !responseDiv) return;
    
    const question = input.value.trim();
    
    if (!question) {
        alert('Vui lòng nhập câu hỏi của bạn.');
        return;
    }
    
    // Show loading
    responseDiv.style.display = 'block';
    responseDiv.innerHTML = '<p>🤔 Đang xử lý câu hỏi của bạn...</p>';
    
    // Simulate AI response (in real implementation, this would call an API)
    setTimeout(() => {
        const response = getAIResponse(question);
        responseDiv.innerHTML = `
            <div style="margin-bottom: 1rem;">
                <strong style="color: var(--brown);">Câu hỏi:</strong> ${question}
            </div>
            <div>
                <strong style="color: var(--brown);">Trả lời:</strong>
                <p style="margin-top: 0.5rem; line-height: 1.8;">${response}</p>
            </div>
        `;
    }, 1500);
}

// Mock AI response generator
function getAIResponse(question) {
    const responses = {
        'bản chất': 'Bản chất của tôn giáo theo chủ nghĩa Mác-Lênin là một hình thái ý thức xã hội phản ánh hư ảo hiện thực khách quan, do con người sáng tạo ra và phụ thuộc vào điều kiện kinh tế - xã hội. Tôn giáo là một thực thể xã hội với niềm tin siêu nhiên, hệ thống giáo thuyết, cơ sở thờ tự, tổ chức và tín đồ.',
        'nguồn gốc': 'Nguồn gốc của tôn giáo bao gồm: (1) Nguồn gốc tự nhiên, kinh tế - xã hội từ xã hội nguyên thủy và xã hội có giai cấp; (2) Nguồn gốc nhận thức do hạn chế nhận thức con người, tuyệt đối hóa chủ thể; (3) Nguồn gốc tâm lý từ sợ hãi, nhu cầu an ủi và tình cảm tích cực.',
        'tính chất': 'Tính chất của tôn giáo gồm: (1) Tính lịch sử - hình thành, tồn tại và biến đổi theo điều kiện lịch sử; (2) Tính quần chúng - phổ biến, đáp ứng nhu cầu tinh thần, có tính nhân văn; (3) Tính chính trị - phản ánh lợi ích giai cấp, có thể bị lợi dụng.',
        'nguyên tắc': 'Các nguyên tắc giải quyết vấn đề tôn giáo gồm: (1) Tôn trọng quyền tự do tín ngưỡng và không tín ngưỡng; (2) Khắc phục dần ảnh hưởng tiêu cực của tôn giáo; (3) Phân biệt mặt tư tưởng và mặt chính trị của tôn giáo; (4) Quan điểm lịch sử – cụ thể.',
        'đặc điểm': 'Đặc điểm tôn giáo ở Việt Nam: (1) Việt Nam có nhiều tôn giáo (16 tôn giáo, 43 tổ chức, 27,7 triệu tín đồ); (2) Tôn giáo đa dạng, đan xen, chung sống hòa bình; (3) Tín đồ phần lớn là nhân dân lao động, yêu nước; (4) Chức sắc có vai trò quan trọng; (5) Có quan hệ với tôn giáo nước ngoài; (6) Thường bị thế lực phản động lợi dụng.',
        'chính sách': 'Chính sách của Đảng, Nhà nước: (1) Tôn giáo là nhu cầu tinh thần, tồn tại lâu dài; (2) Thực hiện chính sách đại đoàn kết dân tộc; (3) Công tác tôn giáo là vận động quần chúng; (4) Công tác tôn giáo là trách nhiệm của cả hệ thống chính trị; (5) Theo đạo và truyền đạo phải tuân thủ pháp luật.'
    };
    
    // Find matching response
    const questionLower = question.toLowerCase();
    for (const [key, value] of Object.entries(responses)) {
        if (questionLower.includes(key)) {
            return value;
        }
    }
    
    // Default response
    return `Cảm ơn bạn đã đặt câu hỏi! Đây là một câu hỏi thú vị về tôn giáo trong thời kỳ quá độ lên chủ nghĩa xã hội. 
    
    Để có câu trả lời chính xác nhất, bạn có thể tham khảo các phần nội dung trên trang web này, bao gồm:
    - Quan điểm của chủ nghĩa Mác-Lênin về tôn giáo
    - Bản chất, nguồn gốc và tính chất của tôn giáo
    - Nguyên tắc giải quyết vấn đề tôn giáo
    - Đặc điểm tôn giáo ở Việt Nam
    - Chính sách của Đảng và Nhà nước
    
    Hoặc bạn có thể đặt câu hỏi cụ thể hơn về các chủ đề trên.`;
}

// Allow Enter key to submit question
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('userQuestion');
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                askAI();
            }
        });
    }
});

// Parallax effect for hero section (subtle)
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero && window.innerWidth > 768) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Console message
console.log('%c🤖 Website về Tôn giáo trong thời kỳ quá độ lên chủ nghĩa xã hội', 'color: #d4af37; font-size: 16px; font-weight: bold;');
console.log('%cWebsite này sử dụng AI để hỗ trợ nội dung và tương tác.', 'color: #5c4033; font-size: 12px;');
console.log('%cTất cả nội dung đã được con người kiểm tra và phê duyệt.', 'color: #2c2c2c; font-size: 12px;');