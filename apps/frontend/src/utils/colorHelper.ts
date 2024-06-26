export const randomColor = () => {
    const color = ['text-primary', 'text-warning', 'text-danger','text-success','text-secondary'];
    const random = Math.floor(Math.random() * color.length);
    return color[random];
};
export const randomBadgeBg = () => {
    const color = ['bg-success', 'bg-secondary', 'bg-danger','bg-primary','bg-warning'];
    const random = Math.floor(Math.random() * color.length);
    return color[random];
};
