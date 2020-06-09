package com.warehouse.srpingwebapp.Model;

import com.warehouse.srpingwebapp.entity.Inventory;
import com.warehouse.srpingwebapp.entity.container;

import java.util.List;


public class containerResponse {

    private List<container> containers;

    private List<Inventory> inventories;

    private String type;

    private boolean typebool;

    public boolean isTypebool() {
        return typebool;
    }

    public void setTypebool(boolean typebool) {
        this.typebool = typebool;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<container> getContainers() {
        return containers;
    }

    public void setContainers(List<container> containers) {
        this.containers = containers;
    }

    public List<Inventory> getInventories() {
        return inventories;
    }

    public void setInventories(List<Inventory> inventories) {
        this.inventories = inventories;
    }
}
