package com.warehouse.srpingwebapp.Model;

import com.warehouse.srpingwebapp.entity.Inventory;

import java.util.List;

public class inventoryResponse {
    private List<Inventory> inventories;


    private String type;

    private boolean typebool;

    public List<Inventory> getInventories() {
        return inventories;
    }

    public void setInventories(List<Inventory> inventories) {
        this.inventories = inventories;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public boolean isTypebool() {
        return typebool;
    }

    public void setTypebool(boolean typebool) {
        this.typebool = typebool;
    }
}
