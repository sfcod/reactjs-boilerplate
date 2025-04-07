export function formatPhoneNumber(phoneNumber?: string): string {
    if (!phoneNumber) {
        return '';
    }

    if (phoneNumber[0] === '+') {
        return formatInternational(phoneNumber);
    }

    return formatLocal(phoneNumber);
}

function formatInternational(phoneNumber: string): string {
    // usa format
    if (phoneNumber[1] === '1') {
        return format(phoneNumber, [2, 3, 3, 10]);
    }
    return format(phoneNumber, [3, 3, 3, 10]);
}

function formatLocal(phoneNumber: string): string {
    return format(phoneNumber, [3, 3, 10]);
}

function format(phoneNumber: string, lengths: number[]): string {
    const parts: string[] = [];
    let startIndex = 0;
    lengths.forEach((length) => {
        parts.push(phoneNumber.substring(startIndex, startIndex + length));
        startIndex += length;
    });
    return parts.join('-');
}
