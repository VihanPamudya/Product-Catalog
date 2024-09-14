package com.productcatalog.productCatalog.service.impl;

import com.productcatalog.productCatalog.dto.request.ProductRequestDto;
import com.productcatalog.productCatalog.dto.response.ProductResponseDto;
import com.productcatalog.productCatalog.model.Product;
import com.productcatalog.productCatalog.model.ProductLine;
import com.productcatalog.productCatalog.repository.IProductRepository;
import com.productcatalog.productCatalog.service.IProductService;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Slf4j
@Service
public class ProductService implements IProductService {

    private final IProductRepository productRepository;

    @Autowired
    public ProductService(IProductRepository productRepository) {
        this.productRepository = productRepository;
    }


    @Override
    public Page<ProductResponseDto> getAllProducts(int page, int size, ProductLine productLine) {
        try {
            PageRequest pageRequest = PageRequest.of(page, size);
            Page<Product> productPage = productLine == ProductLine.ALL
                    ? productRepository.findAll(pageRequest)
                    : productRepository.findByProductLine(productLine, pageRequest);

            return productPage.map(this::convertProductToProductResponseDto);
        } catch (Exception ex) {
            log.error("Error fetching products: {}", ex.getMessage(), ex);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to retrieve products", ex);
        }
    }

    @Override
    public ProductResponseDto getProductById(Long id) {
        try {
            Product product = productRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Product not found with ID: " + id));
            return convertProductToProductResponseDto(product);
        } catch (EntityNotFoundException ex) {
            log.error("Error fetching product by ID: {}", ex.getMessage(), ex);
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage());
        } catch (Exception ex) {
            log.error("Unexpected error: {}", ex.getMessage(), ex);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to retrieve product", ex);
        }
    }

    @Override
    public ProductResponseDto createProduct(ProductRequestDto productRequest) {
        try {
            if (productRequest != null) {
                Product product = new Product();
                BeanUtils.copyProperties(productRequest, product);
                Product savedProduct = productRepository.save(product);
                return convertProductToProductResponseDto(savedProduct);
            } else {
                log.warn("Product request data is null");
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Product request data is missing.");
            }
        } catch (Exception ex) {
            log.error("Error creating product: {}", ex.getMessage(), ex);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to create product", ex);
        }
    }

    @Override
    public ProductResponseDto updateProduct(Long id, ProductRequestDto productRequest) {
        try {
            Optional<Product> productOptional = productRepository.findById(id);
            if (productOptional.isPresent()) {
                Product productToUpdate = productOptional.get();
                BeanUtils.copyProperties(productRequest, productToUpdate);
                Product updatedProduct = productRepository.save(productToUpdate);
                return convertProductToProductResponseDto(updatedProduct);
            } else {
                log.warn("Product not found with ID: {}", id);
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found with ID: " + id);
            }
        } catch (Exception ex) {
            log.error("Error updating product: {}", ex.getMessage(), ex);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to update product", ex);
        }
    }

    @Override
    public void deleteProduct(Long id) {
        try {
            Optional<Product> productOptional = productRepository.findById(id);
            if (productOptional.isPresent()) {
                productRepository.deleteById(id);
            } else {
                log.warn("Product not found with ID: {}", id);
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found with ID: " + id);
            }
        } catch (Exception ex) {
            log.error("Error deleting product: {}", ex.getMessage(), ex);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to delete product", ex);
        }
    }

    @Override
    public ProductResponseDto convertProductToProductResponseDto(Product product) {
        ProductResponseDto productResponse = new ProductResponseDto();
        BeanUtils.copyProperties(product, productResponse);
        return productResponse;
    }
}
