package com.warehouse.srpingwebapp.repository;

import com.warehouse.srpingwebapp.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InventoryRepository extends JpaRepository<Inventory,Integer> {

    List<Inventory> findByparentid(Integer parentid);

    Inventory findBybarcode(Integer barcode);

    void deleteBybarcode(Integer barcode);

}
