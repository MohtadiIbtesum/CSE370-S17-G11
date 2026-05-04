-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 04, 2026 at 05:19 AM
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
(4, 'GPU'),
(5, 'Storage'),
(6, 'PSU'),
(7, 'Case');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `user_id` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone_number` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`user_id`, `address`, `phone_number`) VALUES
(1, 'Dhaka', 123456789),
(2, 'Chittagong', 123456780),
(3, 'Sylhet', 123456781),
(4, 'Khulna', 123456782),
(5, 'Rajshahi', 123456783),
(6, 'Barisal', 123456784),
(7, 'Comilla', 123456785),
(8, 'Gazipur', 123456786),
(9, 'Narayanganj', 123456787),
(10, 'Rangpur', 123456788),
(11, 'Dhaka', 111111111),
(13, 'Dhaka', 222222222);

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

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`invocie_id`, `invoice_date`, `order_id`) VALUES
(1, '2026-05-04', 1),
(2, '2026-05-04', 2),
(3, '2026-05-04', 3),
(4, '2026-05-04', 4),
(5, '2026-05-04', 5);

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

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `order_date`, `status`, `customer_id`) VALUES
(1, '2026-05-04', 'Pending', 1),
(2, '2026-05-04', 'Pending', 1),
(3, '2026-05-04', 'Pending', 1),
(4, '2026-05-04', 'Pending', 1),
(5, '2026-05-04', 'Pending', 1);

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

--
-- Dumping data for table `order_products`
--

INSERT INTO `order_products` (`order_id`, `product_id`, `quantity`) VALUES
(1, 1, 1),
(2, 1, 1),
(3, 1, 18),
(4, 29, 2),
(5, 20, 1),
(5, 21, 1);

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
(1, 'Ryzen 5 5600X', 180.00, 480, '2026-04-27', 1, 1),
(2, 'Intel i5-12400F', 190.00, 800, '2026-04-27', 2, 1),
(10, 'Intel i5-12400F', 16500.00, 15, '2026-05-04', 2, 1),
(11, 'Intel i7-12700K', 32000.00, 10, '2026-05-04', 2, 1),
(12, 'AMD Ryzen 5 5600', 15000.00, 18, '2026-05-04', 1, 1),
(13, 'AMD Ryzen 7 5800X', 28000.00, 12, '2026-05-04', 1, 1),
(14, 'AMD Ryzen 9 5900X', 42000.00, 8, '2026-05-04', 1, 1),
(15, 'Intel i5-13400F', 22000.00, 14, '2026-05-04', 2, 1),
(16, 'Intel i7-13700K', 45000.00, 7, '2026-05-04', 2, 1),
(17, 'AMD Ryzen 5 7600', 26000.00, 11, '2026-05-04', 1, 1),
(18, 'AMD Ryzen 7 7700X', 38000.00, 9, '2026-05-04', 1, 1),
(19, 'GTX 1660 Super', 18000.00, 10, '2026-05-04', 7, 2),
(20, 'RTX 3060', 32000.00, 7, '2026-05-04', 7, 2),
(21, 'RTX 3070', 45000.00, 5, '2026-05-04', 7, 2),
(22, 'RTX 3080', 65000.00, 5, '2026-05-04', 7, 2),
(23, 'RTX 4060', 38000.00, 12, '2026-05-04', 7, 2),
(24, 'RTX 4070', 75000.00, 4, '2026-05-04', 7, 2),
(25, 'RX 6600', 25000.00, 10, '2026-05-04', 1, 2),
(26, 'RX 6700 XT', 40000.00, 7, '2026-05-04', 1, 2),
(27, 'RX 6800 XT', 60000.00, 5, '2026-05-04', 1, 2),
(28, 'RX 7600', 30000.00, 9, '2026-05-04', 1, 2),
(29, 'ASUS B660M', 12000.00, 8, '2026-05-04', 3, 3),
(30, 'MSI B550 Tomahawk', 14000.00, 12, '2026-05-04', 4, 3),
(31, 'Gigabyte B650', 22000.00, 8, '2026-05-04', 8, 3),
(32, 'ASUS Z790', 35000.00, 6, '2026-05-04', 3, 3),
(33, 'MSI A520M', 9000.00, 14, '2026-05-04', 4, 3),
(34, 'Gigabyte Z690', 28000.00, 7, '2026-05-04', 8, 3),
(35, 'ASUS B550 Prime', 13000.00, 11, '2026-05-04', 3, 3),
(36, 'MSI B760', 24000.00, 9, '2026-05-04', 4, 3),
(37, 'Corsair 8GB DDR4', 2500.00, 25, '2026-05-04', 5, 4),
(38, 'Corsair 16GB DDR4', 4500.00, 20, '2026-05-04', 5, 4),
(39, 'G.Skill 16GB DDR4', 4200.00, 22, '2026-05-04', 6, 4),
(40, 'G.Skill 32GB DDR4', 8000.00, 15, '2026-05-04', 6, 4),
(41, 'Corsair 16GB DDR5', 7000.00, 18, '2026-05-04', 5, 4),
(42, 'G.Skill 32GB DDR5', 12000.00, 12, '2026-05-04', 6, 4),
(43, 'WD 500GB HDD', 2000.00, 30, '2026-05-04', 8, 5),
(44, 'WD 1TB HDD', 3000.00, 25, '2026-05-04', 8, 5),
(45, 'Seagate 1TB HDD', 3200.00, 20, '2026-05-04', 8, 5),
(46, 'Kingston 256GB SSD', 2500.00, 18, '2026-05-04', 8, 5),
(47, 'Kingston 512GB SSD', 4000.00, 15, '2026-05-04', 8, 5),
(48, 'WD 1TB NVMe', 6500.00, 10, '2026-05-04', 8, 5),
(49, 'Corsair 450W', 3500.00, 20, '2026-05-04', 5, 6),
(50, 'Corsair 550W', 4500.00, 18, '2026-05-04', 5, 6),
(51, 'Corsair 650W', 6000.00, 15, '2026-05-04', 5, 6),
(52, 'MSI 750W', 7500.00, 12, '2026-05-04', 4, 6),
(53, 'Gigabyte 850W', 9000.00, 10, '2026-05-04', 8, 6),
(54, 'Cooler Master Case A', 3000.00, 15, '2026-05-04', 4, 7),
(55, 'Corsair Mid Tower', 4500.00, 12, '2026-05-04', 5, 7),
(56, 'NZXT H510', 6000.00, 10, '2026-05-04', 3, 7),
(57, 'Deepcool Case X', 2800.00, 18, '2026-05-04', 4, 7),
(58, 'Gigabyte Gaming Case', 5000.00, 140, '2026-05-04', 8, 7);

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
(8, 'tdp', '65', 2);

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
(13, 'John Doe', 'john2@example.com', 'password123'),
(14, 'SupExe', 'mohtadi@gmail.com', '123456');

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
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

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
  ADD CONSTRAINT `fk_admin_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `build_includes`
--
ALTER TABLE `build_includes`
  ADD CONSTRAINT `build_includes_ibfk_1` FOREIGN KEY (`build_id`) REFERENCES `custom_builds` (`build_id`),
  ADD CONSTRAINT `fk_build_includes_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;

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
  ADD CONSTRAINT `fk_order_products_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_products_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);

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
  ADD CONSTRAINT `fk_spec_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
