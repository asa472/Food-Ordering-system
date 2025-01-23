import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-dark text-white py-4 mt-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h5 className="fw-bold">About Us</h5>
                        <p>This Website is Developed By <b>Ashish Sharma</b></p>
                        <p>Learn More About FoodyWeb and Our Mission to Provide Delicious Food Items.</p>
                    </div>
                    <div className="col-md-4">
                        <h5 className="fw-bold">Follow Us</h5>
                        <br/>
                        <ul className="list-inline social-icons">
                            <li className="list-inline-item"><a href="https://www.facebook.com/profile.php?id=100057353183726&mibextid=rS40aB7S9Ucbxw6v" target="_blank" className="text-white btn btn-floating rounded-circle m-1" style={{ backgroundColor: '#3b5998' }} role="button"><i className="fab fa-facebook"></i></a></li>
                            <li className="list-inline-item"><a href="https://x.com/paddy3003?t=jV5QNUif9RqNq-dhcj17VQ&s=09" target="_blank" className="text-white btn btn-floating rounded-circle m-1" style={{ backgroundColor: '#55acee' }} role="button"><i className="fab fa-twitter"></i></a></li>
                            <li className="list-inline-item"><a href="https://www.instagram.com/singh_prashant_30?igsh=M2Zod2ZvZ2J0YWVt" target="_blank" className="text-white btn btn-floating rounded-circle m-1" style={{ backgroundColor: '#ac2bac' }} role="button"><i className="fab fa-instagram"></i></a></li>
                            <li className="list-inline-item"><a href="https://www.linkedin.com/in/prashant-singh-a55110241?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" className="text-white btn btn-floating rounded-circle m-1" style={{ backgroundColor: '#0082ca' }} role="button"><i className="fab fa-linkedin-in"></i></a></li>
                            <li className="list-inline-item"><a href="https://github.com/prashantsingh30" className="text-white btn btn-floating rounded-circle m-1" target="_blank" style={{ backgroundColor: '#333333' }} role="button"><i className="fab fa-github"></i></a></li>
                            <li className="list-inline-item"><a href="mailto:singhprashantsuresh@gmail.com" className="text-white btn btn-floating rounded-circle m-1" target="_blank" style={{ backgroundColor: '#dd4b39' }} role="button"><i className="fas fa-envelope"></i></a></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5 className="fw-bold">Contact Info</h5>
                        <p>713331, chittaranjan,WestBengal</p>
                        <p>Email: info@foodyweb.com</p>
                        <p>Phone: +91-123-456-7890</p>
                    </div>
                </div>
            </div>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-6">
                        <p>&copy; 2024<b>FoodyWeb</b>, Inc. All rights reserved.</p>
                    </div>
                    <div className="col-md-6 text-end">
                        <ul className="list-inline">
                            <li className="list-inline-item"><Link to="https://www.linkedin.com/in/prashant-singh-a55110241?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" className="text-white text-decoration-none fw-bold">Promotions |</Link></li>
                            <li className="list-inline-item"><Link to="https://policies.google.com/privacy" target="_blank" className="text-white text-decoration-none fw-bold">Privacy Policy |</Link></li>
                            <li className="list-inline-item"><Link to="https://policies.google.com/terms" target="_blank" className="text-white text-decoration-none fw-bold">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
