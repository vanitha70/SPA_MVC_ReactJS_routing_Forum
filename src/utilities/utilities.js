export default class Utilities {

    showLess(text, size) {
        if (text.length <= size) {
            return text
        }
        let array = text.split(' ')
        let result = ''

        if (!text.includes(' ')) {
            return text.slice(0, size - 3) + '...'
        }

        if (size < 4) {
            return ".".repeat(size)
        }

        result = array[0]

        for (let i = 1; i < array.length; i++) {
            if (result.length + 4 + array[i].length > size) {
                return result + '...'
            }
            result += ` ${array[i]}`
        }
    }
}
