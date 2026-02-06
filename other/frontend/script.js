const pointer = document.querySelector('.mouse-follower')

document.body.addEventListener('mouseleave', (e)=>{
    const {clientX, clientY} = e
    
    pointer.style.transform = `translate(${clientX}px, ${clientY}px,)`
})