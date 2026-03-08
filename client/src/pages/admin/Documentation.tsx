import "./Documentation.css";

export default function Documentation(){
    return (
        <div className="documentation-cont">
            <div className="inner-column">
                <h3>Documentation</h3>
                <section>
                    <p>
                        This page provides thorough deocumentation on the this web application. 
                        Its features, how it functions, and any additional information will be provided below.
                        Hopefully, all information needed to operate this web application successfully is included
                    </p>
                    <p>
                        This web application is divided into two main components, Non-Admin and Admin side pages.
                    </p>
                </section>
                <section>
                    <div>
                        <h5>Non-Admin Side</h5>
                        <p>
                            Non-Admin Side pages are pages facing the customers. 
                            They can browse and order through these pages, but no major action can be done besdies which.    
                        </p>
                    </div>
                    <div>
                        <h6>Home Page (TODO)</h6>
                        <p>
                            The home page provides landing access to the visitors and customers. 
                            Provides eye-catching and basic information to hopefully retain visitors, and lead them into ordering.
                        </p>
                    </div>
                    <div>
                        <h6>Menu Page</h6>
                        <p>
                            The menu page provides customers the ability to browse and add to cart all menu items, alongside the ability to create custom items available for order.
                        </p>
                        <p>
                            Individual menu items quantity can be modified through "+" and "-" buttons.
                            There is no maximum cap for the quantity of an individual menu item's input.
                            Customers can press the menu item, opening the description, what it contains, and whether it is vegan over the image of the menu item.
                        </p>
                        <p>
                            Custom Items can be added at the buttom of the menu page.
                            Customers can input the requested items name, description, and whether it is vegan or not.
                            Its quantity can also be modified through the same ways and range as other menu items.
                        </p>
                    </div>
                    <div>
                        <h6>Cart Page</h6>
                        <p>
                            The cart carries all the added items menu items and custom items by the customer. 
                            In this page, they can order items on the cart
                        </p>
                        <p>
                            Customer information regarding the order is filled out here.
                            Their name, email, and phone number is collected, alongside delivery address and date.
                            All of which, are required information needed to place an order.
                            Payment is done on delivery day.
                        </p>
                        <p>
                            Delivery address can either be on the CSUS Campue Library, or a custom address the customer fills out.
                            This can be toggled with button underneath the input area.
                            The delivery date is set where teh earliest possible order they can make is the day after the current date.
                            There is no limit as to how far they can place this order.
                        </p>
                        <p>
                            Menu items quantity and custom items information can be modified on this page.
                            Additional comments can be placed aswell for the order, where additional information can be added by the customer if needed.
                        </p>
                    </div>
                </section>
                <section>
                    <div>
                        <h5>Admin Side</h5>
                        <p>
                            The admin side are the pages only accessable by you, Kandyce Jerome Jackson Whatever your name is.
                            This page allows you to modify menu contents on your website that customers will browse and order.
                        </p>
                        <p>
                            This page can be accessed by the URL, adding "/admin" to the base URL.
                            Anyone can access it if they now the URL extension, but only you know the password to have access to it.
                        </p>
                    </div>
                    <div>
                        <h6>Login Page</h6>
                        <p>
                            You will automatically be redirected here after trying to access the admin page.
                            Password is ********* ykwim.
                            Contact Zach if you want to change your password, or ask information about what the password is.
                            After a successful login, you will be redirected to the Orders page.
                            You have 10 tries every 15 minutes, so don't mess it up.
                        </p>
                    </div>
                    <div>
                        <h6>Orders Page</h6>
                        <p>
                            This page displays all the orders that are current. 
                            Orders placed are automatically added on here for you navigate and access.
                        </p>
                        <p>
                            At the top, you can see the dashboard where you can see several points of what I think is important information.
                            The total number of orders, number of items to make, when the soonest order is due, and the potential money you can make for motivation is all up there.
                        </p>
                        <p>
                            Below are the orders themselves.
                            They can be sorted and filtered as you like using the buttons.
                            These orders are orders placed by the customer via the Cart page.
                            You can either accept or decline the order.
                            If declining, you have the option to send a message regarding why you had declined the order.
                            This message, alongside other actions like making an order or accepting an order sends emails to the customer.
                        </p>
                        <p>
                            Clicking an order allows you to expand it, displaying all the information needed when completing the order.
                            Customer, delivery, and menu item and custom item information are all there.
                        </p>
                        <p>
                            When an order is completed (delivered and paid), you can expand the order and click the "Order Complete" button.
                            This button marks the order complete, sending a thank you email and clearing it from your orders list.
                        </p>
                    </div>
                    <div>
                        <h6>Menu Page</h6>
                        <p>
                            This page is for editing menu items that customers see.
                        </p>
                        <p>
                            Categories are the category of a food item.
                            This can be set to whatever you want, and however you want to divide your food items for ease of browsing.
                            A category can be like "Dessert" or "Main" or literally whatever you want.
                        </p>
                        <p>
                            After setting categories, you can add, delete, and edit menu items in a category.
                            This is where you can set the name, price, description, and other needed information for the menu item.
                            An image can be added as well.
                            You can upload an image, or simply add the link to one; either will work.
                        </p>
                        <p>
                            As mentioned, you can delete categories and menu items individually, though be wary when doing so.
                            When deleting, there is no undoing.
                            Deleting will delete it from the database, meaning there is no retrieving it afterwards.
                            Keep in mind, deleting a category with menu items inside of it will delete not only the category, but also the menu items in said categoty.
                            So, be careful and make sure you are deleting the right thing.
                        </p>
                    </div>
                    <div>
                        <h6>Documentation</h6>
                        <p>
                            This page, is this page.
                            It is documentation on the web application you had tasked me to make.
                            This page is intended for you, Kandyce, to read it and understand the ins and outs of this web application.
                            For more technical details, refer to the github:
                            <a href="https://github.com/ZachRadaza/LocalEatsWithKandyce">
                                https://github.com/ZachRadaza/LocalEatsWithKandyce
                            </a> 
                            . Read the READMEs attached.
                        </p>
                    </div>
                </section>
                <section>
                    <h4>That is all, adios</h4>
                </section>
            </div>
        </div>
    );
}