export const getMapDots = async () => {
    const res = await fetch('https://662c1862de35f91de15a71ec.mockapi.io/resources');
    const data = await res.json();
    return data[0];
}