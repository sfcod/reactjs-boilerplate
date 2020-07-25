import React from 'react';
import styles from './assets/footer.module.scss';
import classNames from 'classnames';
import facebook from './assets/images/facebook.png';
import twitter from './assets/images/twitter.png';
import instagram from './assets/images/instagram.png';
import linkedin from './assets/images/linkedin.png';

const Footer: React.FunctionComponent = React.memo(() => (
    <footer className={classNames(styles.footer)}>
        <div className={classNames(styles.top)}>
            <div className={classNames('container')}>
                <div className={classNames(styles.topHolder, 'row')}>
                    <div className={classNames(styles.contactUs, 'col-md-3')}>
                        <b>Contact Us</b>
                    </div>
                    <div className={classNames(styles.address, 'col-md-3')}>
                        <b>Address</b>
                        <p>131 Business Center Drive</p>
                        <p>USA</p>
                    </div>
                    <div className={classNames(styles.phoneNumber, 'col-md-3')}>
                        <b>Phone Number</b>
                        <p>xxx.xxx.xxx</p>
                    </div>
                    <div className={classNames(styles.email, 'col-md-3')}>
                        <b>Email</b>
                        <p>
                            <a href="mailto:xxx@gmail.com">xxx@gmail.com</a>
                        </p>
                        <div className={classNames(styles.socials)}>
                            <a href="https://www.facebook.com">
                                <img src={facebook} alt="facebook" />
                            </a>
                            <a href="https://twitter.com">
                                <img src={twitter} alt="twitter" />
                            </a>
                            <a href="https://www.instagram.com">
                                <img src={instagram} alt="instagram" />
                            </a>
                            <a href="https://www.linkedin.com">
                                <img src={linkedin} alt="linkedin" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className={classNames(styles.bottom)}>
            <div className={classNames(styles.bottomHolder, 'container')}>
                <span>©{new Date().getFullYear()} Some company</span>
                <span>All Rights Reserved.</span>
            </div>
        </div>
    </footer>
));

export default Footer;
