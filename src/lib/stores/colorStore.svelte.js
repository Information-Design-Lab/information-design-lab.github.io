let _color = $state('');

export const getColor = () => {
    return {
        get color() {
            return this._color;
        },
        setColor(newColor) {
            this._color = newColor;
        }
    }
}