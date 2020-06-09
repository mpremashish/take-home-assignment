package com.warehouse.srpingwebapp.utilities;

import java.util.ArrayList;
import java.util.Arrays;

public class constants {
    private static ArrayList<String> c1 = new ArrayList<>(Arrays.asList("rack","box","square"));
    private static ArrayList<String> c2 = new ArrayList<>(Arrays.asList("paperbag","leatherbag","itembox"));

    public static ArrayList<String> getC1() {
        return c1;
    }

    public static ArrayList<String> getC2() {
        return c2;
    }

}
