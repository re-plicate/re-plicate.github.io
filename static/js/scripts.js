const content_dir = 'contents/'
const config_file = 'config.yml'
const section_names = ['home', 'publications', 'awards', 'experience']


window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // 导航栏滚动效果
    let lastScroll = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // 更新导航链接活动状态
    const updateActiveNav = () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav);

    // Yaml
    fetch(content_dir + config_file)
        .then(response => response.text())
        .then(text => {
            const yml = jsyaml.load(text);
            Object.keys(yml).forEach(key => {
                try {
                    document.getElementById(key).innerHTML = yml[key];
                } catch {
                    console.log("Unknown id and value: " + key + "," + yml[key].toString())
                }

            })
        })
        .catch(error => console.log(error));


    // Marked
    marked.use({ 
        mangle: false, 
        headerIds: false,
        breaks: false,
        gfm: true
    })
    section_names.forEach((name, idx) => {
        fetch(content_dir + name + '.md')
            .then(response => response.text())
            .then(markdown => {
                const html = marked.parse(markdown, {
                    breaks: false,
                    gfm: true
                });
                document.getElementById(name + '-md').innerHTML = html;
            }).then(() => {
                // MathJax
                MathJax.typeset();
            })
            .catch(error => console.log(error));
    })

    // 滚动动画观察器
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // 观察所有需要动画的元素（排除home和awards section）
    setTimeout(() => {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            // 跳过home和awards section的动画
            if (section.id === 'home' || section.id === 'awards') {
                // 直接显示，不应用动画
                const headers = section.querySelectorAll('header h2');
                const mainBodies = section.querySelectorAll('.main-body');
                headers.forEach(header => {
                    header.style.opacity = '1';
                    header.style.transform = 'none';
                });
                mainBodies.forEach(body => {
                    body.style.opacity = '1';
                    body.style.transform = 'none';
                });
                return;
            }
            
            const headers = section.querySelectorAll('header h2');
            const mainBodies = section.querySelectorAll('.main-body');
            const figures = section.querySelectorAll('figure');
            const videoWrappers = section.querySelectorAll('.video-wrapper');
            
            headers.forEach(header => observer.observe(header));
            mainBodies.forEach(body => observer.observe(body));
            figures.forEach(figure => observer.observe(figure));
            videoWrappers.forEach(wrapper => observer.observe(wrapper));
        });
    }, 500);

    // 平滑滚动增强
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 视差滚动效果（轻微）
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const topSection = document.querySelector('.top-section');
        if (topSection) {
            const rate = scrolled * 0.5;
            topSection.style.transform = `translateY(${rate}px)`;
        }
    });

    // 鼠标移动视差效果（头像）
    const avatar = document.querySelector('#avatar img');
    if (avatar) {
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            const moveX = (mouseX - 0.5) * 10;
            const moveY = (mouseY - 0.5) * 10;
            avatar.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
        });
    }

}); 
