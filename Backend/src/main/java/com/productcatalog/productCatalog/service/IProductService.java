package com.productcatalog.productCatalog.service;

import com.productcatalog.productCatalog.dto.request.ProductRequestDto;
import com.productcatalog.productCatalog.dto.response.ProductResponseDto;
import com.productcatalog.productCatalog.model.Product;
import com.productcatalog.productCatalog.model.ProductLine;
import org.springframework.data.domain.Page;

public interface IProductService {
    public Page<ProductResponseDto> getAllProducts(int page, int size, ProductLine productLine);
    public ProductResponseDto getProductById(Long id);
    public ProductResponseDto createProduct(ProductRequestDto productRequest);
    public ProductResponseDto updateProduct(Long id, ProductRequestDto productRequest);
    public void deleteProduct(Long id);
    public ProductResponseDto convertProductToProductResponseDto(Product product);
}
