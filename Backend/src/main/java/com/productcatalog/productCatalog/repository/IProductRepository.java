package com.productcatalog.productCatalog.repository;

import com.productcatalog.productCatalog.model.Product;
import com.productcatalog.productCatalog.model.ProductLine;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByProductLine(ProductLine productLine, Pageable pageable);
}
