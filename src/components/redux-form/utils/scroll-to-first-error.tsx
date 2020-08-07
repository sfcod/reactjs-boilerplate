import { FormErrors } from 'redux-form';

export function scrollToFirstError<T>(formName: string, offset = 50) {
    return (errors: FormErrors<T>) => {
        const firstError = Object.keys(errors as AnyObject)[0];

        let element: HTMLElement;
        if (firstError === '_error') {
            element = document.getElementById(formName) as HTMLElement;
        } else {
            element = document.querySelector(`[name=${firstError}]`) as HTMLElement;
        }

        if (element) {
            const y = element.getBoundingClientRect().top + window.pageYOffset - offset;

            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };
}
