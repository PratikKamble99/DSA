function swap(a, b) {
    a = a ^ b;
    b = a ^ b;
    a = a ^ b;
}

swap(5, 6);
