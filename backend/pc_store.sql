-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 02, 2026 at 09:33 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pc_store`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `user_id` int(11) NOT NULL,
  `Employee_id` int(11) NOT NULL,
  `Department` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `admin_manages`
--

CREATE TABLE `admin_manages` (
  `admin_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `brand_id` int(11) NOT NULL,
  `brand_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`brand_id`, `brand_name`) VALUES
(1, 'AMD'),
(2, 'Intel'),
(3, 'ASUS'),
(4, 'MSI'),
(5, 'Corsair'),
(6, 'G.Skill'),
(7, 'NVIDIA'),
(8, 'Gigabyte');

-- --------------------------------------------------------

--
-- Table structure for table `build_includes`
--

CREATE TABLE `build_includes` (
  `build_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`) VALUES
(1, 'CPU'),
(2, 'Motherboard'),
(3, 'RAM'),
(4, 'GPU');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `user_id` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone_number` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `custom_builds`
--

CREATE TABLE `custom_builds` (
  `build_id` int(11) NOT NULL,
  `build_name` varchar(255) NOT NULL,
  `is_compatible` tinyint(1) NOT NULL,
  `customer_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `invocie_id` int(11) NOT NULL,
  `invoice_date` date NOT NULL,
  `order_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `order_date` date NOT NULL,
  `status` varchar(50) NOT NULL,
  `customer_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_build`
--

CREATE TABLE `order_build` (
  `order_id` int(11) NOT NULL,
  `build_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_products`
--

CREATE TABLE `order_products` (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock_qty` int(11) NOT NULL,
  `date_added` date NOT NULL,
  `brand_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `price`, `stock_qty`, `date_added`, `brand_id`, `category_id`) VALUES
(1, 'Ryzen 5 5600X', 180.00, 10, '2026-04-27', 1, 1),
(2, 'Intel i5-12400F', 190.00, 8, '2026-04-27', 2, 1),
(3, 'ASUS B550-F Gaming', 150.00, 5, '2026-04-27', 3, 2),
(4, 'MSI B660M Pro', 140.00, 6, '2026-04-27', 4, 2),
(5, 'Corsair Vengeance 16GB DDR4', 75.00, 15, '2026-04-27', 5, 3),
(6, 'G.Skill Ripjaws 16GB DDR4', 70.00, 12, '2026-04-27', 6, 3),
(7, 'NVIDIA RTX 3060', 350.00, 4, '2026-04-27', 7, 4),
(8, 'Gigabyte RTX 3070', 500.00, 3, '2026-04-27', 8, 4);

-- --------------------------------------------------------

--
-- Table structure for table `specifications`
--

CREATE TABLE `specifications` (
  `spec_id` int(11) NOT NULL,
  `spec_name` varchar(255) NOT NULL,
  `spec_value` varchar(255) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `specifications`
--

INSERT INTO `specifications` (`spec_id`, `spec_name`, `spec_value`, `product_id`) VALUES
(1, 'cores', '6', 1),
(2, 'threads', '12', 1),
(3, 'socket', 'AM4', 1),
(4, 'tdp', '65', 1),
(5, 'cores', '6', 2),
(6, 'threads', '12', 2),
(7, 'socket', 'LGA1700', 2),
(8, 'tdp', '65', 2),
(9, 'socket', 'AM4', 3),
(10, 'chipset', 'B550', 3),
(11, 'ram_type', 'DDR4', 3),
(12, 'socket', 'LGA1700', 4),
(13, 'chipset', 'B660', 4),
(14, 'ram_type', 'DDR4', 4),
(15, 'capacity', '16GB', 5),
(16, 'type', 'DDR4', 5),
(17, 'speed', '3200MHz', 5),
(18, 'capacity', '16GB', 6),
(19, 'type', 'DDR4', 6),
(20, 'speed', '3600MHz', 6),
(21, 'vram', '12GB', 7),
(22, 'tdp', '170', 7),
(23, 'vram', '8GB', 8),
(24, 'tdp', '220', 8);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `password`) VALUES
(1, 'Arafat Hossain', 'arafat.hossain@gmail.com', 'pass123'),
(2, 'Nusrat Jahan', 'nusrat.jahan@yahoo.com', 'secure456'),
(3, 'Tanvir Ahmed', 'tanvir.ahmed@outlook.com', 'tanvir789'),
(4, 'Mehedi Hasan', 'mehedi.hasan@gmail.com', 'mh@2024'),
(5, 'Farhana Islam', 'farhana.islam@gmail.com', 'farhana321'),
(6, 'Rakib Chowdhury', 'rakib.chowdhury@yahoo.com', 'rakib007'),
(7, 'Sadia Rahman', 'sadia.rahman@outlook.com', 'sadia888'),
(8, 'Imran Kabir', 'imran.kabir@gmail.com', 'ikpass999'),
(9, 'Tania Sultana', 'tania.sultana@yahoo.com', 'tania123'),
(10, 'Fahim Karim', 'fahim.karim@outlook.com', 'fksecure456'),
(11, 'John Doe', 'john@example.com', 'password123'),
(13, 'John Doe', 'john2@example.com', 'password123');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `admin_manages`
--
ALTER TABLE `admin_manages`
  ADD PRIMARY KEY (`admin_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`brand_id`);

--
-- Indexes for table `build_includes`
--
ALTER TABLE `build_includes`
  ADD PRIMARY KEY (`build_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `custom_builds`
--
ALTER TABLE `custom_builds`
  ADD PRIMARY KEY (`build_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`invocie_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `order_build`
--
ALTER TABLE `order_build`
  ADD PRIMARY KEY (`order_id`,`build_id`),
  ADD KEY `build_id` (`build_id`);

--
-- Indexes for table `order_products`
--
ALTER TABLE `order_products`
  ADD PRIMARY KEY (`order_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `brand_id` (`brand_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `specifications`
--
ALTER TABLE `specifications`
  ADD PRIMARY KEY (`spec_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admins`
--
ALTER TABLE `admins`
  ADD CONSTRAINT `admins_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `admin_manages`
--
ALTER TABLE `admin_manages`
  ADD CONSTRAINT `admin_manages_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`user_id`),
  ADD CONSTRAINT `admin_manages_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `build_includes`
--
ALTER TABLE `build_includes`
  ADD CONSTRAINT `build_includes_ibfk_1` FOREIGN KEY (`build_id`) REFERENCES `custom_builds` (`build_id`),
  ADD CONSTRAINT `build_includes_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `customers`
--
ALTER TABLE `customers`
  ADD CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `custom_builds`
--
ALTER TABLE `custom_builds`
  ADD CONSTRAINT `custom_builds_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`user_id`);

--
-- Constraints for table `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`user_id`);

--
-- Constraints for table `order_build`
--
ALTER TABLE `order_build`
  ADD CONSTRAINT `order_build_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `order_build_ibfk_2` FOREIGN KEY (`build_id`) REFERENCES `custom_builds` (`build_id`);

--
-- Constraints for table `order_products`
--
ALTER TABLE `order_products`
  ADD CONSTRAINT `order_products_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `order_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`brand_id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`);

--
-- Constraints for table `specifications`
--
ALTER TABLE `specifications`
  ADD CONSTRAINT `specifications_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
