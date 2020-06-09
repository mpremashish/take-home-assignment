package com.warehouse.srpingwebapp.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer barcode;

    private Integer parentid;


    private String name;

    private String des;

    private Integer rootParentid;

    private Integer amount;

    private Integer listnum;

    public Integer getBarcode() {
        return barcode;
    }

    public void setBarcode(Integer barcode) {
        this.barcode = barcode;
    }

    public Integer getParentid() {
        return parentid;
    }

    public void setParentid(Integer parentid) {
        this.parentid = parentid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDes() {
        return des;
    }

    public void setDes(String des) {
        this.des = des;
    }

    public Integer getRootParentid() {
        return rootParentid;
    }

    public void setRootParentid(Integer rootParentid) {
        this.rootParentid = rootParentid;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public Integer getListnum() {
        return listnum;
    }

    public void setListnum(Integer listnum) {
        this.listnum = listnum;
    }
}
