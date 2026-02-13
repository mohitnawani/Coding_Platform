#include <iostream>
using namespace std;

int add(int a, int b) {
    int result = a + b;
    return result;
}

int factorial(int n) {
    int fact = 1;
    for(int i = 1; i <= n; i++) {
        fact = fact * i;
    }
    return fact;
}

int main() {
    int x, y;
    cout << "Enter two numbers: ";
    cin >> x >> y;

    int sum = add(x, y);
    cout << "Sum = " << sum << endl;

    int num;
    cout << "Enter a number for factorial: ";
    cin >> num;

    int fact = factorial(num);
    cout << "Factorial = " << fact << endl;

    return 0;
}
