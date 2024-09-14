package com.productcatalog.productCatalog.dto.request;

import com.productcatalog.productCatalog.model.ProductLine;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class ProductRequestDto {
    private String productName;
    private String productDescription;
    private BigDecimal productPrice;
    private ProductLine productLine;
}
