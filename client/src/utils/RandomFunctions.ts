export function isPrime(num: number): boolean {
    if(num <= 1) 
        return false;
    if(num === 2)
        return true;
    if(num % 2 === 0)
        return false;

    for(let i = 3; i <= Math.sqrt(num); i += 2){
        if(num % i === 0) 
            return false;
    }

    return true;
}

export function scrollToID(id: string){
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: "smooth" });
    }
}

export function wait(ms: number) {
    return new Promise<void>(resolve => {
        setTimeout(resolve, ms);
    });
}